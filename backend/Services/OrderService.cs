using System.Data;
using System.Net;
using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Enums;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.EntityFrameworkCore;

namespace MagicPostApi.Services;

public interface IOrderService
{
	Task<List<PublicOrderInfo>> GetAsync();
	Task<DataPagination<PublicOrderInfo>> GetAsync(string? status, string? category, DateTime? startDate, DateTime? endDate, int pageNumber);
	Task<List<OrderHistory>> GetAsyncById(Guid id);
	Task<List<PublicOrderInfo>> GetIncomingOrdersAsync(User user, int pageNumber);
	Task<bool> ConfirmIncomingOrdersAsync(User user, List<ConfirmIncomingOrderModel> orders);
	Task<List<PublicOrderInfo>> GetOutgoingOrdersAsync(User user, int pageNumber);
	Task<bool> ForwardOrdersAsync(User user, List<Guid> orderIds);
	Task UpdateAsync(Guid id, UpdateOrderModel model);
	Task CreateAsync(User user, Order newOrder);
}

public class OrderService : IOrderService
{
	private readonly IMapper _mapper;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly DbSet<Order> _ordersRepository;
	private readonly DbSet<Item> _itemsRepository;
	public OrderService(IMapper mapper, WebAPIDataContext webAPIDataContext)
	{
		_mapper = mapper;
		_webAPIDataContext = webAPIDataContext;
		_ordersRepository = webAPIDataContext.Orders;
		_itemsRepository = webAPIDataContext.Items;
	}

	public async Task<DataPagination<PublicOrderInfo>> GetAsync(string? status, string? category, DateTime? startDate, DateTime? endDate, int pageNumber)
	{
		var orders = _ordersRepository.AsQueryable();
		if (!string.IsNullOrEmpty(status))
		{
			OrderState orderStateToFilt = OrderState.PENDING;
			switch (status)
			{
				case "delivering":
					orderStateToFilt = OrderState.DELIVERING;
					break;
				case "cancelled":
					orderStateToFilt = OrderState.CANCELLED;
					break;
				case "delivered":
					orderStateToFilt = OrderState.DELIVERED;
					break;
				default:
					break;
			}
			orders = orders.Where(o => o.Status == orderStateToFilt);
		}
		if (!string.IsNullOrEmpty(category))
		{
			orders = orders.Where(o => o.Type == category);
		}
		if (endDate != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, endDate.Value) < 0);
		}
		if (startDate != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, startDate.Value) > 0);
		}
		List<PublicOrderInfo> result = await orders.Select(o => o.GetPublicOrderInfo())
												.Skip((int)Pagination.PAGESIZE * (pageNumber - 1))
												.Take((int)Pagination.PAGESIZE)
												.ToListAsync();
		return new DataPagination<PublicOrderInfo>(result, orders.Count(), pageNumber);
	}

	public async Task<List<PublicOrderInfo>> GetIncomingOrdersAsync(User user, int pageNumber)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);
		List<PublicOrderInfo> orders = _webAPIDataContext.Deliveries.Where(d => d.ToPointId == currentPoint.Id && d.State == DeliveryState.DELIVERING)
														.Include(d => d.Order)
														.Skip((int)Pagination.PAGESIZE * (pageNumber - 1))
														.Take((int)Pagination.PAGESIZE)
														.Select(d => d.Order.GetPublicOrderInfo())
														.ToList();
		return orders;
	}

	public async Task<bool> ConfirmIncomingOrdersAsync(User user, List<ConfirmIncomingOrderModel> orders)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);
		List<Delivery> deliveriesUpdate = new();
		List<Order> ordersUpdate = new();
		orders.ForEach(o =>
		{
			Delivery? deliveryUpdate = _webAPIDataContext.Deliveries.FirstOrDefault(d => d.OrderId == o.orderId && d.State == DeliveryState.DELIVERING);
			if (deliveryUpdate != null)
			{
				deliveryUpdate.State = o.Confirm ? DeliveryState.ARRIVED : DeliveryState.UNSUCCESS;
				deliveriesUpdate.Add(deliveryUpdate);
				Order? orderNeedUpdate = _ordersRepository.FirstOrDefault(ord => ord.Id == o.orderId);
				orderNeedUpdate.CurrentPointId = currentPoint.Id;
				ordersUpdate.Add(orderNeedUpdate);
			}
		});
		_webAPIDataContext.Deliveries.UpdateRange(deliveriesUpdate);
		_webAPIDataContext.Orders.UpdateRange(ordersUpdate);
		_webAPIDataContext.SaveChanges();
		return true;
	}

	public async Task<List<PublicOrderInfo>> GetOutgoingOrdersAsync(User user, int pageNumber)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);
		List<PublicOrderInfo> orders = _ordersRepository.Where(o => o.CurrentPointId == currentPoint.Id)
														.Skip((int)Pagination.PAGESIZE * (pageNumber - 1))
														.Take((int)Pagination.PAGESIZE)
														.Select(o => o.GetPublicOrderInfo())
														.ToList();
		return orders;
	}

	public async Task<bool> ForwardOrdersAsync(User user, List<Guid> orderIds)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);
		List<Delivery> newDeliveries = new();
		orderIds.ForEach(ord =>
		{
			Order? order = _ordersRepository.FirstOrDefault(o => o.Id == ord);
			Delivery newDelivery = new Delivery();
			newDelivery.FromPointId = currentPoint?.Id;
			newDelivery.State = DeliveryState.DELIVERING;
			if (currentPoint?.Type == PointType.TransactionPoint)
			{
				if (order.SenderProvince == currentPoint.Province)
				{
					newDelivery.ToPointId = _webAPIDataContext.Points
						.FirstOrDefault(p => p.Province == currentPoint.Province && p.Type == PointType.GatheringPoint)?.Id;
				}
				else if (order.ReceiverProvince == currentPoint.Province)
				{
					// Delivery to user and export the bill
				}
			}
			else
			{
				if (order.ReceiverProvince == currentPoint.Province)
				{
					newDelivery.ToPointId = _webAPIDataContext.Points
						.FirstOrDefault(p => p.District == order.ReceiverDistrict && p.Type == PointType.TransactionPoint)?.Id;
				}
				else
				{
					newDelivery.ToPointId = _webAPIDataContext.Points
						.FirstOrDefault(p => p.Type == PointType.GatheringPoint && p.Province == order.ReceiverProvince)?.Id;
				}
			}
			newDelivery.CreatedAt = DateTime.UtcNow;
			newDelivery.UpdatedAt = DateTime.UtcNow;
			newDelivery.OrderId = order.Id;
			newDeliveries.Add(newDelivery);
		});
		await _webAPIDataContext.Deliveries.AddRangeAsync(newDeliveries);
		await _webAPIDataContext.SaveChangesAsync();
		return true;
	}

	public async Task<List<PublicOrderInfo>> GetAsync()
		 => await _ordersRepository
					 .Include(o => o.Items)
					 .Select(o => o.GetPublicOrderInfo())
					 .ToListAsync();

	public async Task<List<OrderHistory>> GetAsyncById(Guid id)
	{
		var deliveries = await _ordersRepository
			.Where(o => o.Id == id)
			.Include(o => o.Deliveries.OrderBy(d => d.CreatedAt))
			.ThenInclude(d => d.FromPoint)
			.Select(o => o.Deliveries)
			.FirstOrDefaultAsync();
		var orderHistory = new List<OrderHistory>()
		{
			new OrderHistory{Point = deliveries.FirstOrDefault()?.FromPoint, ArriveAt = deliveries.FirstOrDefault().CreatedAt}
		};
		deliveries.ToList().ForEach(d =>
		{
			if (d.State == DeliveryState.ARRIVED)
			{
				OrderHistory history = new OrderHistory()
				{
					Point = d.ToPoint,
					ArriveAt = d.ReceiveTime
				};
				orderHistory.Add(history);
			}
		});
		return orderHistory;
	}

	public async Task UpdateAsync(Guid id, UpdateOrderModel model)
	{
		Order? order = await _ordersRepository.Where(o => o.Id == id).FirstOrDefaultAsync() ?? throw new AppException(HttpStatusCode.NotFound, "Order not found!");
		_mapper.Map(model, order);
		_ordersRepository.Update(order);
		_webAPIDataContext.SaveChanges();
	}

	public async Task CreateAsync(User user, Order newOrder)
	{
		newOrder.CurrentPointId = user.PointId;
		await _ordersRepository.AddAsync(newOrder);
		await _webAPIDataContext.SaveChangesAsync();
	}
}
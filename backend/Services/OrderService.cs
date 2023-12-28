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
	Task<DataPagination<PublicOrderInfo>> FilterAsync(int pageNumber, OrderState? status, string? category, DateTime? startDate, DateTime? endDate);
	Task<List<OrderHistory>> GetAsyncById(Guid id);
	Task<DataPagination<PublicOrderInfo>> GetIncomingOrdersAsync(User user, string? province, string? district, DateTime? startDate, DateTime? endDate, int pageNumber);
	Task<bool> ConfirmIncomingOrdersAsync(User user, List<ConfirmIncomingOrderModel> orders);
	Task<DataPagination<PublicOrderInfo>> GetOutgoingOrdersAsync(User user, string? province, string? district, int pageNumber);
	Task<bool> ForwardOrdersAsync(User user, List<Guid> orderIds);
	Task<List<PublicOrderInfo>> FiltOrderAsync( string? status, string? category, DateTime? startDate, DateTime? endDate, int pageNumber);
	Task UpdateAsync(Guid id, UpdateOrderModel model);
	// Task CreateAsync(User user, Order newOrder);
	Task CreateAsync(Order newOrder);
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

	public async Task<List<PublicOrderInfo>> FiltOrderAsync( string? status, string? category, DateTime? startDate, DateTime? endDate, int pageNumber ) 
	{
		var orders = _ordersRepository.AsQueryable();
		if(!string.IsNullOrEmpty(status)) 
		{
			OrderState orderStateToFilt = OrderState.PENDING;
			switch (status) {
				case "delivering":
					orderStateToFilt = OrderState.DELIVERING;
					break;
				case "cancelled":
					orderStateToFilt = OrderState.CANCELLED;
					break;
				case "delivered":
					orderStateToFilt  = OrderState.DELIVERED;
					break;
				default:
					break;
			}
			orders = orders.Where(o => o.Status == orderStateToFilt).AsQueryable();
		}
		if (!string.IsNullOrEmpty(category)) 
		{	
			orders = orders.Where(o => o.Type == category).AsQueryable();
		}
		if (endDate != null) {
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, endDate.Value) < 0).AsQueryable();
		}
		if (startDate != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, startDate.Value) > 0).AsQueryable();
		}
		return orders.Select(o => o.GetPublicOrderInfo()).Skip((int)Pagination.PAGESIZE * (pageNumber - 1)).Take((int)Pagination.PAGESIZE).ToList();
	}

	public async Task<DataPagination<PublicOrderInfo>> GetIncomingOrdersAsync(User user, string? province, string? district, DateTime? startDate, DateTime? endDate, int pageNumber)
	{
		Point? currentPoint = await _webAPIDataContext.Points.Where(p => p.Id == user.PointId).FirstOrDefaultAsync();
		var orders = _webAPIDataContext.Deliveries
														.Include(d => d.FromPoint)
														.Include(d => d.ToPoint)
														.Where(d => d.ToPointId == currentPoint.Id && d.State == DeliveryState.DELIVERING)
														.AsQueryable();
		if (province != null)
		{
			orders = orders.Where(o => o.FromPoint.Province == province).AsQueryable();
		}
		if (district != null)
		{
			orders = orders.Where(o => o.FromPoint.District == district).AsQueryable();
		}
		if (startDate != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, startDate.Value) > 0).AsQueryable();
		}
		if (endDate != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, endDate.Value) < 0).AsQueryable();
		}
		List<PublicOrderInfo> result = await orders.Skip((int)Pagination.PAGESIZE * (pageNumber - 1))
					.Take((int)Pagination.PAGESIZE)
					.Select(d => d.Order.GetPublicOrderInfo())
					.ToListAsync();
		return new DataPagination<PublicOrderInfo>(result, orders.Count(), pageNumber);
	}

	public async Task<bool> ConfirmIncomingOrdersAsync(User user, List<ConfirmIncomingOrderModel> orders) 
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);
		List<Delivery> deliveriesUpdate = new();
		List<Order> ordersUpdate = new();
		orders.ForEach(o => {
			Delivery? deliveryUpdate =  _webAPIDataContext.Deliveries.FirstOrDefault(d => d.OrderId == o.orderId && d.State == DeliveryState.DELIVERING);
			if (deliveryUpdate != null) 
			{
				deliveryUpdate.State = o.Confirm ? DeliveryState.ARRIVED : DeliveryState.UNSUCCESS;
				deliveryUpdate.ReceiveTime = DateTime.UtcNow;
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

	public async Task<DataPagination<PublicOrderInfo>> GetOutgoingOrdersAsync(User user, string? province, string? district, int pageNumber)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);

		List<Order> orders = await _ordersRepository.Where(o => o.CurrentPointId == currentPoint.Id)
														.Skip((int)Pagination.PAGESIZE * (pageNumber - 1))
														.Take((int)Pagination.PAGESIZE)
														.ToListAsync();
		List<PublicOrderInfo> ordersToGo = new();
		orders.ForEach(ord =>
		{
			ordersToGo.Add(ord.GetPublicOrderInfo());
			Delivery newDelivery = new();
			Point? nextPoint = null;
			if (currentPoint?.Type == PointType.TRANSACTION_POINT)
			{
				if (ord.SenderProvince == currentPoint.Province)
				{
					nextPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.Province == currentPoint.Province && p.Type == PointType.GATHERING_POINT);

				}
				else if (ord.SenderProvince == currentPoint.Province)
				{
					// Delivery to user and export the bill
				}
			}
			else
			{
				if (ord.ReceiverProvince == currentPoint.Province)
				{
					nextPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.District == ord.ReceiverDistrict && p.Type == PointType.TRANSACTION_POINT);
				}
				else
				{
					nextPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.Province == ord.ReceiverProvince && p.Type == PointType.GATHERING_POINT);
				}
			}
			if (province != null)
			{
				if (nextPoint.Province == province) ordersToGo.Add(ord.GetPublicOrderInfo());

			}
			if (district != null)
			{
				if (nextPoint.District == district) ordersToGo.Add(ord.GetPublicOrderInfo());
			}
		});
		return new DataPagination<PublicOrderInfo>(ordersToGo, ordersToGo.Count, pageNumber);
	}

	public async Task<bool> ForwardOrdersAsync(User user, List<Guid> orderIds) 
	{
		Console.WriteLine(orderIds);
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);
		List<Delivery> newDeliveries = new();
		orderIds.ForEach(ord => {
			Order? order = _ordersRepository.FirstOrDefault(o => o.Id == ord);
			Delivery newDelivery = new()
			{
				FromPointId = currentPoint?.Id,
				State = DeliveryState.DELIVERING
			};
			if (currentPoint?.Type == PointType.TRANSACTION_POINT)
			{
				if (order.SenderProvince == currentPoint.Province) 
				{
					newDelivery.ToPointId = _webAPIDataContext.Points
						.FirstOrDefault(p => p.Province == currentPoint.Province && p.Type == PointType.GATHERING_POINT)?.Id;
				}
				else if (order.ReceiverProvince == currentPoint.Province) 
				{
					// Delivery to user and export the bill
				}
			}
			else 
			{
				if (order.ReceiverProvince == currentPoint.Province ) 
				{
					newDelivery.ToPointId = _webAPIDataContext.Points
						.FirstOrDefault(p => p.District == order.ReceiverDistrict && p.Type == PointType.TRANSACTION_POINT)?.Id;
				}
				else 
				{
					newDelivery.ToPointId = _webAPIDataContext.Points
						.FirstOrDefault(p => p.Type == PointType.GATHERING_POINT && p.Province == order.ReceiverProvince)?.Id;
				}
			} 
			newDelivery.CreatedAt = DateTime.UtcNow;
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

	public async Task<List<OrderHistory>> GetAsync(Guid id) 
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
		deliveries.ToList().ForEach(d => {
			if (d.State == DeliveryState.ARRIVED) {
				OrderHistory history = new OrderHistory() {
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

	// public async Task CreateAsync(User user, Order newOrder)
	// {
	// 	newOrder.CurrentPointId = user.PointId;
	// 	await _ordersRepository.AddAsync(newOrder);
	// 	await _webAPIDataContext.SaveChangesAsync();
	// }

	public async Task CreateAsync(Order newOrder)
	{
		await _ordersRepository.AddAsync(newOrder);
		await _webAPIDataContext.SaveChangesAsync();
	}
}
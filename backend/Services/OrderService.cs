using System.Data;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Enums;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MagicPostApi.Services;

public interface IOrderService
{
	Task<List<PublicOrderInfo>> GetAsync();
	Task<DataPagination<PublicOrderInfo>> FilterAsync(int pageNumber, OrderState? status, string? category, DateTime? startDate, DateTime? endDate);
	Task<PublicOrderInfo?> GetAsyncById(Guid id);
	Task<List<OrderHistory>> GetOrderHistoryAsyncById(Guid id);
	Task<DataPagination<PublicOrderInfo>> GetIncomingOrdersAsync(User user, string? province, string? district, DateTime? startDate, DateTime? endDate, int pageNumber);
	Task<bool> ConfirmIncomingOrdersAsync(User user, ConfirmIncomingOutgoingOrderModel model);
	Task<DataPagination<PublicOrderInfo>> GetOutgoingOrdersAsync(User user, string? province, string? district, int pageNumber);
	Task<bool> ForwardOrdersAsync(User user, ConfirmIncomingOutgoingOrderModel model);
	Task UpdateAsync(Guid id, UpdateOrderModel model);
	// Task CreateAsync(User user, Order newOrder);
	Task CreateAsync(Order newOrder);
	Task<DataPagination<PublicOrderInfo>> GetArrivedOrderAsync(User user, int pageNumber, DateTime? startDate, DateTime? endDate, string? category);
	Task<bool> ConfirmArrivedOrdersAsync(ConfirmIncomingOutgoingOrderModel model);
	Task<bool> RejectArrivedOrdersAsync(ConfirmIncomingOutgoingOrderModel model);
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

	public async Task<DataPagination<PublicOrderInfo>> FilterAsync(int pageNumber, OrderState? status, string? category, DateTime? startDate, DateTime? endDate)
	{
		var orders = _ordersRepository.AsQueryable();
		if (status != null)
		{
			orders = orders.Where(o => o.Status == status);
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
		List<PublicOrderInfo> result = await orders.OrderByDescending(o => o.CreatedAt)
												.Select(o => o.GetPublicOrderInfo())
												.Skip((int)Pagination.PAGESIZE * (pageNumber - 1))
												.Take((int)Pagination.PAGESIZE)
												.ToListAsync();
		return new DataPagination<PublicOrderInfo>(result, orders.Count(), pageNumber);
	}

	public async Task<DataPagination<PublicOrderInfo>> GetIncomingOrdersAsync(User user, string? province, string? district, DateTime? startDate, DateTime? endDate, int pageNumber)
	{
		Point? currentPoint = await _webAPIDataContext.Points.Where(p => p.Id == user.PointId).FirstOrDefaultAsync() ?? throw new AppException(HttpStatusCode.NotFound, "The point you belong to not found!");
		var orders = _webAPIDataContext.Deliveries
														.Include(d => d.FromPoint)
														.Include(d => d.ToPoint)
														.Include(d => d.Order)
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

	public async Task<bool> ConfirmIncomingOrdersAsync(User user, ConfirmIncomingOutgoingOrderModel model)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId) ?? throw new AppException(HttpStatusCode.NotFound, "Current point not found");
		List<Guid> orders = model.Orders;
		List<Delivery> deliveriesUpdate = new();
		List<Order> ordersUpdate = new();
		orders.ForEach(o =>
		{
			if (!model.Confirm)
			{
				Order? orderNeedUpdate = _ordersRepository.FirstOrDefault(ord => ord.Id == o) ?? throw new AppException(HttpStatusCode.NotFound, "Order not found");
				orderNeedUpdate.Status = OrderState.CANCELLED;
				ordersUpdate.Add(orderNeedUpdate);
			}
			else
			{
				Delivery? deliveryUpdate = _webAPIDataContext.Deliveries.FirstOrDefault(d => d.OrderId == o && d.State == DeliveryState.DELIVERING);
				if (deliveryUpdate != null)
				{
					// deliveryUpdate.State = o.Confirm ? DeliveryState.ARRIVED : DeliveryState.UNSUCCESS;
					deliveryUpdate.State = DeliveryState.ARRIVED;
					deliveryUpdate.ReceiveTime = DateTime.UtcNow;
					deliveriesUpdate.Add(deliveryUpdate);
					Order? orderNeedUpdate = _ordersRepository.FirstOrDefault(ord => ord.Id == o) ?? throw new AppException(HttpStatusCode.NotFound, "Order not found");
					orderNeedUpdate.CurrentPointId = currentPoint.Id;
					if (currentPoint.Province == orderNeedUpdate.ReceiverProvince && currentPoint.District == orderNeedUpdate.ReceiverDistrict && currentPoint.Type == PointType.TRANSACTION_POINT)
					{
						orderNeedUpdate.Status = OrderState.ARRIVED;
					}
					else
					{
						orderNeedUpdate.Status = OrderState.PENDING;
					}
					ordersUpdate.Add(orderNeedUpdate);
				}
			}
		});
		_webAPIDataContext.Deliveries.UpdateRange(deliveriesUpdate);
		_webAPIDataContext.Orders.UpdateRange(ordersUpdate);
		_webAPIDataContext.SaveChanges();
		return true;
	}

	public async Task<DataPagination<PublicOrderInfo>> GetOutgoingOrdersAsync(User user, string? province, string? district, int pageNumber)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId) ?? throw new AppException(HttpStatusCode.NotFound, "The point you belong to not found!");

		var query = _ordersRepository
						.Where(o => o.CurrentPointId == currentPoint.Id && o.Status == OrderState.PENDING);
		int count = query.Count();
		List<Order> orders = await query
						.Skip((int)Pagination.PAGESIZE * (pageNumber - 1))
						.Take((int)Pagination.PAGESIZE)
						.ToListAsync();
		List<PublicOrderInfo> ordersToGo = new();
		orders.ForEach(ord =>
		{
			ordersToGo.Add(ord.GetPublicOrderInfo());
			Delivery newDelivery = new();
			Point? nextPoint = null;
			if (currentPoint.Type == PointType.TRANSACTION_POINT)
			{
				nextPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.Province == currentPoint.Province && p.Type == PointType.GATHERING_POINT);
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
		return new DataPagination<PublicOrderInfo>(ordersToGo, count, pageNumber);
	}

	public async Task<bool> ForwardOrdersAsync(User user, ConfirmIncomingOutgoingOrderModel model)
	{
		Point currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId) ?? throw new AppException(HttpStatusCode.NotFound, "The point you belong to not found!");
		List<Delivery> newDeliveries = new();
		List<Guid> orderIds = model.Orders;
		orderIds.ForEach(ord =>
		{
			Order? order = _ordersRepository.FirstOrDefault(o => o.Id == ord)!;
			Delivery newDelivery = new()
			{
				FromPointId = currentPoint.Id,
				State = DeliveryState.DELIVERING
			};
			order.Status = OrderState.DELIVERING;
			// Check if current point is transaction
			if (currentPoint.Type == PointType.TRANSACTION_POINT)
			{
				// Check if receiver province equals to current point province
				// => So that delivery inside province (district -> district)
				// => So that delivery from transaction to transaction
				if (order.SenderProvince == currentPoint.Province)
				{
					Point toPoint = _webAPIDataContext.Points
						.FirstOrDefault(p => p.Province == currentPoint.Province && p.Type == PointType.GATHERING_POINT) ?? throw new AppException("Cannot find destination transaction point (district transaction -> district transaction)");
					newDelivery.ToPointId = toPoint.Id;
				}
				// Else it will be delivery outside province (province -> province)
				// => So first create deliver from district transaction to province gathering
				// else
				// {
				// 	Point toPoint = _webAPIDataContext.Points
				// 		.FirstOrDefault(p => p.Province == currentPoint.Province && p.Type == PointType.GATHERING_POINT) ?? throw new AppException("Cannot find destination gathering point (district transaction -> province transaction)");
				// 	newDelivery.ToPointId = toPoint.Id;
				// }
			}
			// Now current point is gathering
			else
			{
				// Check if receiver province equals to current point province
				// => So that delivery from province gathering to district transaction
				if (order.ReceiverProvince == currentPoint.Province)
				{
					Point toPoint = _webAPIDataContext.Points
						.FirstOrDefault(p => p.District == order.ReceiverDistrict && p.Type == PointType.TRANSACTION_POINT) ?? throw new AppException("Cannot find destination transaction point (province gathering -> district transaction)");
					newDelivery.ToPointId = toPoint.Id;
				}
				// Now receiver province not equals to current point province
				// => So that delivery from province gathering to province gathering
				else
				{
					Point toPoint = _webAPIDataContext.Points
						.FirstOrDefault(p => p.Province == order.ReceiverProvince && p.Type == PointType.GATHERING_POINT) ?? throw new AppException("Cannot find destination transaction point (province gathering -> district transaction)");
					newDelivery.ToPointId = toPoint.Id;
				}
			}
			newDelivery.OrderId = order.Id;
			newDeliveries.Add(newDelivery);
		});
		await _webAPIDataContext.Deliveries.AddRangeAsync(newDeliveries);
		await _webAPIDataContext.SaveChangesAsync();
		return true;
	}

	public async Task<bool> ConfirmArrivedOrdersAsync(ConfirmIncomingOutgoingOrderModel model)
	{
		List<Guid> orders = model.Orders;
		orders.ForEach(orderId =>
		{
			Order? order = _ordersRepository.FirstOrDefault(o => o.Id == orderId) ?? throw new AppException(HttpStatusCode.NotFound, "Order not found");
			order.Status = OrderState.DELIVERED;
			_ordersRepository.Update(order);
		});
		await _webAPIDataContext.SaveChangesAsync();
		return true;
	}

	public async Task<bool> RejectArrivedOrdersAsync(ConfirmIncomingOutgoingOrderModel model)
	{
		List<Guid> rejectedOrders = model.Orders;
		rejectedOrders.ForEach(ord =>
		{
			Order? order = _ordersRepository.FirstOrDefault(o => o.Id == ord);
			order.Status = OrderState.CANCELLED;
			_ordersRepository.Update(order);
		});
		await _webAPIDataContext.SaveChangesAsync();
		return true;
	}
	public async Task<List<PublicOrderInfo>> GetAsync()
		 => await _ordersRepository
					 .Include(o => o.Items)
					 .Select(o => o.GetPublicOrderInfo())
					 .ToListAsync();

	public async Task<PublicOrderInfo?> GetAsyncById(Guid id)
		 => await _ordersRepository
					.Where(o => o.Id == id)
					.Include(o => o.Items)
					.Select(o => o.GetPublicOrderInfo())
					.FirstOrDefaultAsync();

	public async Task<List<OrderHistory>> GetOrderHistoryAsyncById(Guid id)
	{
		var deliveries = await _ordersRepository
			.Where(o => o.Id == id)
			.Include(o => o.Deliveries.OrderBy(d => d.CreatedAt))
			.ThenInclude(d => d.FromPoint)
			.Select(o => o.Deliveries)
			.FirstOrDefaultAsync();
		var orderHistory = new List<OrderHistory>()
		{
			new OrderHistory{Point = deliveries!.FirstOrDefault()?.FromPoint, ArriveAt = deliveries!.FirstOrDefault()!.CreatedAt}
		};
		deliveries!.ToList().ForEach(d =>
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
		order = _mapper.Map(model, order);
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

	public async Task<DataPagination<PublicOrderInfo>> GetArrivedOrderAsync(User user, int pageNumber, DateTime? startDate, DateTime? endDate, string? category)
	{
		Point currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId) ?? throw new AppException(HttpStatusCode.NotFound, "Current point not found");
		List<Order> orders = await _ordersRepository.Where(o => o.CurrentPointId == currentPoint.Id
													&& o.Status == OrderState.ARRIVED && o.ReceiverProvince == currentPoint.Province
													&& o.ReceiverDistrict == currentPoint.District)
													.ToListAsync();
		if (startDate != null)
		{
			orders = orders.Where(o => DateTime.Compare(startDate.Value, o.UpdatedAt) < 0).ToList();
		}
		if (endDate != null)
		{
			orders = orders.Where(o => DateTime.Compare(endDate.Value, o.UpdatedAt) > 0).ToList();
		}
		if (category != null)
		{
			orders = orders.Where(o => o.Type == category).ToList();
		}
		var ordersInfo = orders.Skip((int)Pagination.PAGESIZE * (pageNumber - 1))
						.Take((int)Pagination.PAGESIZE)
						.Select(o => o.GetPublicOrderInfo())
						.ToList();
		return new DataPagination<PublicOrderInfo>(ordersInfo, ordersInfo.Count, pageNumber);
	}
}
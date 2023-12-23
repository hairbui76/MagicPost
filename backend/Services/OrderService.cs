using System.Data;
using System.Net;
using System.Transactions;
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
	Task<PublicOrderInfo?> GetAsync(Guid id);
	Task<List<PublicOrderInfo>> GetIncomingOrdersAsync(User user, int pageNumber);
	Task<bool> ConfirmIncomingOrdersAsync(User user, List<ConfirmIncomingOrderModel> orders);
	Task UpdateAsync(Guid id, UpdateOrderModel model);
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

	public async Task<List<PublicOrderInfo>> GetIncomingOrdersAsync(User user, int pageNumber) 
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);
		List<PublicOrderInfo> orders = _webAPIDataContext.Deliveries.Where(d => d.ToPointId == currentPoint.Id && d.State == DeliveryState.DELIVERING)
														.Include(d => d.Order)
														.Skip(Pagination.PageSize * (pageNumber - 1))
														.Take(pageNumber)
														.Select(d => d.Order.GetPublicOrderInfo())
														.ToList();
		return orders;
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
				deliveriesUpdate.Add(deliveryUpdate);
				Order orderNeedUpdate = _ordersRepository.FirstOrDefault(ord => ord.Id == o.orderId);
				orderNeedUpdate.CurrentPointId = currentPoint.Id;
				ordersUpdate.Add(orderNeedUpdate);
			}
		});
		_webAPIDataContext.Deliveries.UpdateRange(deliveriesUpdate);
		_webAPIDataContext.Orders.UpdateRange(ordersUpdate);
		return true;
	}

 	public async Task<List<PublicOrderInfo>> GetAsync()
			=> await _ordersRepository
						.Include(o => o.Items)
						.Select(o => o.GetPublicOrderInfo())
						.ToListAsync();

	public async Task<PublicOrderInfo?> GetAsync(Guid id)
			=> await _ordersRepository
						.Where(o => o.Id == id)
						.Include(o => o.Deliveries.OrderBy(d => d.CreatedAt))
						.Select(o => o.GetPublicOrderInfo())
						.FirstOrDefaultAsync();

	public async Task UpdateAsync(Guid id, UpdateOrderModel model)
	{
		Order? order = await _ordersRepository.Where(o => o.Id == id).FirstOrDefaultAsync() ?? throw new AppException(HttpStatusCode.NotFound, "Order not found!");
		_mapper.Map(model, order);
		_ordersRepository.Update(order);
		_webAPIDataContext.SaveChanges();
	}

	public async Task CreateAsync(Order newOrder)
	{
		await _ordersRepository.AddAsync(newOrder);
		await _webAPIDataContext.SaveChangesAsync();
	}
}
using System.Data;
using System.Net;
using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.EntityFrameworkCore;

namespace MagicPostApi.Services;

public interface IOrderService
{
	Task<List<PublicOrderInfo>> GetAsync();
	Task<PublicOrderInfo?> GetAsync(Guid id);
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
	public async Task<List<PublicOrderInfo>> GetFilterAsync(User userRequest, string senderName, string receiverName, string status, int pageNumber) 
	{
		List<PublicOrderInfo> orders = await _ordersRepository
											.Include(o => o.Items)
											.Select(o => o.GetPublicOrderInfo())
											.ToListAsync();
		if (senderName != null) orders = orders.Where(o => o.Sender.Name.Contains(senderName)).ToList();
		if (receiverName != null) orders =  orders.Where(o => o.Receiver.Name.Contains(receiverName)).ToList();
		return orders.Skip(Pagination.PageSize * pageNumber).Take(Pagination.PageSize).ToList();
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
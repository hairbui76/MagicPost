using System.Net;
using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.EntityFrameworkCore;

namespace MagicPostApi.Services;

public interface IOrderService
{
	Task<List<Order>> GetAsync();
	Task<Order?> GetAsync(Guid id);
	Task UpdateAsync(Guid id, UpdateOrderModel model);
	Task CreateAsync(Order newOrder);
}

public class OrderService : IOrderService
{
	private readonly IMapper _mapper;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly DbSet<Order> _ordersRepository;
	public OrderService(IMapper mapper, WebAPIDataContext webAPIDataContext)
	{
		_mapper = mapper;
		_webAPIDataContext = webAPIDataContext;
		_ordersRepository = webAPIDataContext.Orders;
	}
	public async Task<List<Order>> GetAsync()
			=> await _ordersRepository.ToListAsync();

	public async Task<Order?> GetAsync(Guid id)
			=> await _ordersRepository.Where(o => o.Id == id).FirstOrDefaultAsync();

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
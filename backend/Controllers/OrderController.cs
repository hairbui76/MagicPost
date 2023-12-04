using AutoMapper;
using MagicPostApi.Enums;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class OrderController : ControllerBase
{
	private readonly IMapper _mapper;
	private readonly IOrderService _orderService;
	public OrderController(IMapper mapper, IOrderService orderService)
	{
		_mapper = mapper;
		_orderService = orderService;
	}

	[HttpGet]
	[VerifyToken]
	public async Task<List<Order>> GetAsync()
			=> await _orderService.GetAsync();

	[HttpGet("{id}")]
	public async Task<Order?> GetAsync(Guid id)
			=> await _orderService.GetAsync(id);

	[HttpPut("{id}")]
	[VerifyToken]
	[VerifyOwner]
	[VerifyRole(new Role[] {Role.TRANSACION_STAFF, Role.GATHERING_STAFF})]
	public async Task<IActionResult> UpdateAsync(Guid id, UpdateOrderModel model)
	{
		await _orderService.UpdateAsync(id, model);
		return Ok(new { message = "Update order successfully!" });
	}

	[HttpPost]
	[VerifyToken]
	[VerifyRole(new Role[] {Role.TRANSACION_STAFF, Role.GATHERING_STAFF})]
	public async Task<IActionResult> CreateAsync(CreateOrderModel model)
	{
		Order order = _mapper.Map<Order>(model);
		await _orderService.CreateAsync(order);
		return Ok(new { message = "Create order successfully!", order });
	}
}
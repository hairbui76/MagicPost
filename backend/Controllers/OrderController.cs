using AutoMapper;
using MagicPostApi.Enums;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
[VerifyToken]
[VerifyRole(new Role[] { Role.COMPANY_ADMINISTRATOR, Role.TRANSACTION_POINT_MANAGER, Role.TRANSACION_STAFF })]
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
	public async Task<List<Order>> GetAsync()
			=> await _orderService.GetAsync();

	[HttpGet("{id}")]
	public async Task<Order?> GetAsync(Guid id)
			=> await _orderService.GetAsync(id);

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateAsync(Guid id, UpdateOrderModel model)
	{
		await _orderService.UpdateAsync(id, model);
		return Ok(new { message = "Update order successfully!" });
	}

	[HttpPost]
	public async Task<IActionResult> CreateAsync(CreateOrderModel model)
	{
		Order order = _mapper.Map<Order>(model);
		await _orderService.CreateAsync(order);
		return Ok(new { message = "Create order successfully!", order });
	}
}
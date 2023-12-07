using AutoMapper;
using MagicPostApi.Enums;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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
	public async Task<IActionResult> GetAsync()
	{
		List<PublicOrderInfo> orders = await _orderService.GetAsync();
		return Ok(new { message = "Get orders successfully", orders });
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetAsync(Guid id)
	{
		PublicOrderInfo? order = await _orderService.GetAsync(id) ?? throw new AppException(HttpStatusCode.NotFound, "Order not found");
		return Ok(new { message = "Get order successfully", order });
	}

	[HttpPut("{id}")]
	[VerifyToken]
	[VerifyOwner]
	[VerifyRole(new Role[] { Role.TRANSACION_STAFF, Role.GATHERING_STAFF })]
	public async Task<IActionResult> UpdateAsync(Guid id, UpdateOrderModel model)
	{
		await _orderService.UpdateAsync(id, model);
		return Ok(new { message = "Update order successfully!" });
	}

	[HttpPost]
	[VerifyToken]
	//[VerifyRole(new Role[] {Role.TRANSACION_STAFF, Role.GATHERING_STAFF})]
	public async Task<IActionResult> CreateAsync(CreateOrderModel model)
	{
		Order order = _mapper.Map<Order>(model);
		await _orderService.CreateAsync(order);
		return Ok(new { message = "Create order successfully!", order });
	}
}
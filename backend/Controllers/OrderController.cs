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
		List<OrderHistory> orderHistory = await _orderService.GetAsync(id) ?? throw new AppException(HttpStatusCode.NotFound, "Order not found");
		return Ok(new { message = "Get order history successfully", orderHistory });
	}

	[HttpGet] 
	[VerifyToken]
	public async Task<IActionResult> FilterOrderAsync( int pageNumber, string? status, string? category, DateTime? startDate, DateTime? endDate) 
	{
		var orders = await _orderService.FiltOrderAsync(status, category, startDate?.ToUniversalTime(), endDate?.ToUniversalTime(), pageNumber);
		return Ok(orders);
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
		await _orderService.CreateAsync((User?)HttpContext.Items["user"] ,order);
		return Ok(new { message = "Create order successfully!", order });
	}

	[HttpGet("{id}")]
	[VerifyToken]
	[VerifyOwner]
	[VerifyRole(Role.TRANSACION_STAFF, Role.GATHERING_STAFF)]
	public async Task<ActionResult<Response<DataPagination<PublicOrderInfo>>>> GetIncomingOrdersAsync(string? province, string? district, DateTime? startDate, DateTime? endDate, int pageNumber)
	{
		User? user = (User?)HttpContext.Items["user"];
		DataPagination<PublicOrderInfo> ordersIncoming = await _orderService.GetIncomingOrdersAsync(user, province, district, startDate, endDate, pageNumber);
		return Ok(new Response<DataPagination<PublicOrderInfo>>("Get incoming orders successfully!", ordersIncoming));
	}

	[HttpPut("{id}")]
	[VerifyToken]
	[VerifyOwner]
	[VerifyRole(new Role[] {Role.TRANSACION_STAFF, Role.GATHERING_STAFF})]
	public async Task<IActionResult> ConfirmIncomingOrdersAsync(List<ConfirmIncomingOrderModel> orders) 
	{
		User? user = (User?)HttpContext.Items["user"];
		var result = await _orderService.ConfirmIncomingOrdersAsync(user, orders);
		return Ok(result);
	} 	

	[HttpGet("{id}")]
	[VerifyToken]
	[VerifyOwner]
	[VerifyRole(Role.TRANSACION_STAFF, Role.GATHERING_STAFF)]
	public async Task<ActionResult<Response<DataPagination<PublicOrderInfo>>>> GetOutgoingOrdersAsync(string? province, string? district, int pageNumber)
	{
		User? user = (User?)HttpContext.Items["user"];
		DataPagination<PublicOrderInfo> ordersOutgoing = await _orderService.GetOutgoingOrdersAsync(user, province, district, pageNumber);
		return Ok(new Response<DataPagination<PublicOrderInfo>>("Get outgoing orders successfully!", ordersOutgoing));
	}

	[HttpPost("{id}")]
	[VerifyToken]
	// [VerifyOwner]
	// [VerifyRole(Role.TRANSACION_STAFF, Role.GATHERING_STAFF)]
	public async Task<IActionResult> ForwardOrdersAsync(List<Guid> orders)
	{
		User? user = (User?)HttpContext.Items["user"];
		var result = await _orderService.ForwardOrdersAsync(user, orders);
		return Ok(result);
	} 
}
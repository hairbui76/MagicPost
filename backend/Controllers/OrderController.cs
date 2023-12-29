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

	[HttpGet]
	[VerifyToken]
	public async Task<ActionResult<Response<DataPagination<PublicOrderInfo>>>> FilterAsync(int pageNumber, OrderState? status, string? category, DateTime? startDate, DateTime? endDate)
	{
		DataPagination<PublicOrderInfo> orders = await _orderService.FilterAsync(pageNumber, status, category, startDate?.ToUniversalTime(), endDate?.ToUniversalTime());
		return Ok(new Response<DataPagination<PublicOrderInfo>>("Get orders successfully", orders));
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Response<PublicOrderInfo>>> GetAsync(Guid id)
	{
		PublicOrderInfo order = await _orderService.GetAsyncById(id) ?? throw new AppException(HttpStatusCode.NotFound, "Order not found");
		return Ok(new Response<PublicOrderInfo>("Get order successfully!", order));
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetOrderHistoryAsync(Guid id)
	{
		List<OrderHistory> orderHistory = await _orderService.GetOrderHistoryAsyncById(id);
		return Ok(new { message = "Get order history successfully", orderHistory });
	}

	[HttpPut("{id}")]
	[VerifyToken]
	[VerifyOwner]
	[VerifyRole(Role.TRANSACTION_STAFF, Role.GATHERING_STAFF)]
	public async Task<IActionResult> UpdateAsync(Guid id, UpdateOrderModel model)
	{
		await _orderService.UpdateAsync(id, model);
		return Ok(new { message = "Update order successfully!" });
	}

	[HttpPost]
	// [VerifyToken]
	// [VerifyPointAndAdmin]
	public async Task<IActionResult> CreateAsync(CreateOrderModel model)
	{
		Order order = _mapper.Map<Order>(model);
		await _orderService.CreateAsync(order);
		return Ok(new { message = "Create order successfully!", order });
	}

	[HttpGet]
	[VerifyToken]
	[VerifyRole(Role.TRANSACTION_STAFF, Role.GATHERING_STAFF, Role.GATHERING_POINT_MANAGER, Role.TRANSACTION_POINT_MANAGER)]
	public async Task<ActionResult<Response<DataPagination<PublicOrderInfo>>>> GetIncomingOrdersAsync(string? province, string? district, DateTime? startDate, DateTime? endDate, int pageNumber)
	{
		User user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		DataPagination<PublicOrderInfo> ordersIncoming = await _orderService.GetIncomingOrdersAsync(user, province, district, startDate, endDate, pageNumber);
		return Ok(new Response<DataPagination<PublicOrderInfo>>("Get incoming orders successfully!", ordersIncoming));
	}

	[VerifyToken]
	[VerifyRole(Role.TRANSACTION_STAFF, Role.GATHERING_STAFF)]
	public async Task<IActionResult> ConfirmIncomingOrdersAsync(List<ConfirmIncomingOrderModel> orders)
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		await _orderService.ConfirmIncomingOrdersAsync(user, orders);
		return Ok(new { message = "Confirm incoming orders successfully!" });
	}

	[HttpGet]
	[VerifyToken]
	[VerifyRole(Role.TRANSACTION_STAFF, Role.GATHERING_STAFF, Role.GATHERING_POINT_MANAGER, Role.TRANSACTION_POINT_MANAGER)]
	public async Task<ActionResult<Response<DataPagination<PublicOrderInfo>>>> GetOutgoingOrdersAsync(string? province, string? district, int pageNumber)
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		DataPagination<PublicOrderInfo> ordersOutgoing = await _orderService.GetOutgoingOrdersAsync(user, province, district, pageNumber);
		return Ok(new Response<DataPagination<PublicOrderInfo>>("Get outgoing orders successfully!", ordersOutgoing));
	}

	[HttpPost]
	[VerifyToken]
	[VerifyRole(Role.TRANSACTION_STAFF, Role.GATHERING_STAFF, Role.GATHERING_POINT_MANAGER, Role.TRANSACTION_POINT_MANAGER)]
	public async Task<IActionResult> ForwardOrdersAsync(List<Guid> orders)
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		await _orderService.ForwardOrdersAsync(user, orders);
		return Ok(new { message = "Forward outgoing orders successfully!" });
	}

	[HttpGet("{id}")]
	[VerifyToken]
	[VerifyRole(Role.TRANSACTION_STAFF, Role.GATHERING_STAFF, Role.GATHERING_POINT_MANAGER, Role.TRANSACTION_POINT_MANAGER)]
	public async Task<ActionResult<Response<DataPagination<PublicOrderInfo>>>> GetArrivedOrdersAsync(int pageNumber, DateTime? startDate, DateTime? endDate, string category)
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		var orders = await _orderService.GetArrivedOrderAsync(user, pageNumber, startDate, endDate, category);
		return Ok(new Response<DataPagination<PublicOrderInfo>>("Get arrived order successfullly", orders));
	}

	[HttpGet("{id}")]
	[VerifyToken]
	[VerifyRole(Role.TRANSACTION_STAFF, Role.GATHERING_STAFF, Role.GATHERING_POINT_MANAGER, Role.TRANSACTION_POINT_MANAGER)]
	public async Task<ActionResult<bool>> ConfirmArrivedOrdersAsync(List<Guid> confirmOrders)
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		await _orderService.ConfirmArrivedOrdersAsync(confirmOrders);
		return Ok(new Response<bool>("Confirm deliveried order successfullly", true));
	}

	[HttpGet("{id}")]
	[VerifyToken]
	[VerifyRole(Role.TRANSACTION_STAFF, Role.GATHERING_STAFF, Role.GATHERING_POINT_MANAGER, Role.TRANSACTION_POINT_MANAGER)]
	public async Task<ActionResult<bool>> RejectArrivedOrdersAsync(List<RejectedOrder> rejectedOrders)
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		await _orderService.RejectArrivedOrdersAsync(rejectedOrders);
		return Ok(new Response<bool>("Confirm deliveried order successfullly", true));
	}
}
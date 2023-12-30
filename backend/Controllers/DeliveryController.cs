using System.Net;
using AutoMapper;
using MagicPostApi.Enums;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
[VerifyToken]
[VerifyRole(Role.COMPANY_ADMINISTRATOR, Role.TRANSACTION_POINT_MANAGER, Role.TRANSACTION_STAFF, Role.GATHERING_STAFF)]
public class DeliveryController : ControllerBase
{
	private readonly IMapper _mapper;
	private readonly IDeliveryService _deliveryService;
	public DeliveryController(IMapper mapper, IDeliveryService deliveryService)
	{
		_mapper = mapper;
		_deliveryService = deliveryService;
	}

	[HttpGet]
	[VerifyToken]
	public async Task<List<Delivery>> GetAsync()
			=> await _deliveryService.GetAsync();

	[HttpGet("{id}")]
	[VerifyOwner]
	[VerifyToken]
	public async Task<Delivery?> GetAsync(Guid id)
			=> await _deliveryService.GetAsync(id);

	[HttpPost]
	[VerifyToken]
	public async Task<IActionResult> CreateAsync(CreateDeliveryModel model)
	{
		Delivery delivery = _mapper.Map<Delivery>(model);
		await _deliveryService.CreateAsync(delivery);
		return Ok(new { message = "Create order successfully!", delivery });
	}

	[HttpGet]
	[VerifyToken]
	[VerifyRole(Role.COMPANY_ADMINISTRATOR, Role.TRANSACTION_POINT_MANAGER, Role.TRANSACTION_STAFF, Role.GATHERING_STAFF)]
	public async Task<ActionResult<DataPagination<DeliveryHistory>>> GetDeliveryHistory(int pageNumber, string? type, string? status)
	{
		User user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		DataPagination<DeliveryHistory> deliveryHistories = await _deliveryService.GetDeliveryHistory(user, type, status, pageNumber);
		return Ok(new Response<DataPagination<DeliveryHistory>>("Get delivery successfully!", deliveryHistories));
	}
}
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
[VerifyRole(new Role[] { Role.COMPANY_ADMINISTRATOR, Role.TRANSACTION_POINT_MANAGER, Role.TRANSACION_STAFF })]
public class PointController : ControllerBase
{

	private readonly IMapper _mapper;
	private readonly IPointService _pointService;
	public PointController(IMapper mapper, IPointService pointService)
	{
		_mapper = mapper;
		_pointService = pointService;
	}

	[HttpGet]
	public async Task<List<Point>> GetAllTransactionPoints()
			=> await _pointService.GetAllTransactionPointsAsync();

	[HttpGet]
	public async Task<List<Point>> GetAllGatheringPoints()
			=> await _pointService.GetAllGatheringPointsAsync();

	[HttpGet("{id}")]
	public async Task<IActionResult> GetPointById(Guid id)
	{
		Point point = await _pointService.GetPointByIdAsync(id) ?? throw new AppException(HttpStatusCode.NotFound, "Point not found");
		return Ok(new { point });
	}

	[HttpGet]
	public async Task<List<User>> GetAllTransactionPointManagersAsync()
			=> await _pointService.GetAllTransactionPointManagersAsync();

	[HttpGet]
	public async Task<List<User>> GetAllGatheringPointManagersAsync()
			=> await _pointService.GetAllGatheringPointManagersAsync();

	[HttpPost]
	public async Task<IActionResult> CreateTransactionPoint(CreatePointModel model)
	{
		Point transactionPoint = _mapper.Map<Point>(model);
		transactionPoint.Type = PointType.TransactionPoint;
		await _pointService.CreateAsync(transactionPoint);
		return Ok(new { message = "Create transaction point successfully!", point = transactionPoint });
	}

	[HttpPost]
	public async Task<IActionResult> CreateGatheringPoint(CreatePointModel model)
	{
		Point gatheringPoint = _mapper.Map<Point>(model);
		gatheringPoint.Type = PointType.GatheringPoint;
		await _pointService.CreateAsync(gatheringPoint);
		return Ok(new { message = "Create gathering point successfully!", point = gatheringPoint });
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdatePointAsync(Guid id, UpdatePointModel model)
	{
		await _pointService.UpdateAsync(id, model);
		return Ok(new { message = "Update point successfully!" });
	}
}
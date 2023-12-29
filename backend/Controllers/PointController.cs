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
	public async Task<ActionResult<Response<List<Point>>>> GetAsync()
	{
		List<Point> points = await _pointService.GetAsync();
		return Ok(new Response<List<Point>>("Get points successfully!", points));
	}

	[HttpGet]
	[VerifyToken]
	public async Task<ActionResult<Response<DataPagination<PublicPointInfo>>>> FilterAsync(int pageNumber, string? province, string? district, string? ward, PointType? type)
	{
		DataPagination<PublicPointInfo> points = await _pointService.FilterAsync(pageNumber, province, district, ward, type);
		return Ok(new Response<DataPagination<PublicPointInfo>>("Get points successfully", points));
	}

	[HttpGet]
	public async Task<List<Point>> GetAllTransactionPoints()
			=> await _pointService.GetAllTransactionPointsAsync();

	[HttpGet]
	public async Task<List<Point>> GetAllGatheringPoints()
			=> await _pointService.GetAllGatheringPointsAsync();

	[HttpGet("{id}")]
	public async Task<ActionResult<Response<Point>>> GetPointById(Guid id)
	{
		Point point = await _pointService.GetPointByIdAsync(id) ?? throw new AppException(HttpStatusCode.NotFound, "Point not found");
		return Ok(new Response<Point>("Get point successfully!", point));
	}

	[HttpGet]
	public async Task<List<User>> GetAllTransactionPointManagersAsync()
			=> await _pointService.GetAllTransactionPointManagersAsync();

	[HttpGet]
	public async Task<List<User>> GetAllGatheringPointManagersAsync()
			=> await _pointService.GetAllGatheringPointManagersAsync();

	[HttpPost]
	public async Task<IActionResult> Create(CreatePointModel model)
	{
		Point newPoint = _mapper.Map<Point>(model);
		await _pointService.CreateAsync(newPoint);
		return Ok(new { message = "Create point successfully!", point = newPoint });
	}

	[HttpPost]
	public async Task<IActionResult> CreateTransactionPoint(CreatePointModel model)
	{
		Point transactionPoint = _mapper.Map<Point>(model);
		transactionPoint.Type = PointType.TRANSACTION_POINT;
		await _pointService.CreateAsync(transactionPoint);
		return Ok(new { message = "Create transaction point successfully!", point = transactionPoint });
	}

	[HttpPost]
	// [VerifyToken]
	// [VerifyRole(Role.COMPANY_ADMINISTRATOR)]
	public async Task<IActionResult> CreatePoint(CreatePointModel model)
	{
		Point newPoint = _mapper.Map<Point>(model);
		await _pointService.CreateAsync(newPoint);
		return Ok(new { message = "Create point successfully!", point = newPoint });
	}

	[HttpPost]
	//[VerifyToken]
	//[VerifyRole(Role.COMPANY_ADMINISTRATOR)]
	public async Task<IActionResult> CreateGatheringPoint(CreatePointModel model)
	{
		Point gatheringPoint = _mapper.Map<Point>(model);
		gatheringPoint.Type = PointType.GATHERING_POINT;
		await _pointService.CreateAsync(gatheringPoint);
		return Ok(new { message = "Create gathering point successfully!", point = gatheringPoint });
	}

	[HttpPut("{id}")]
	// [VerifyToken]
	// [VerifyOwner]
	// [VerifyRole(new Role[] { Role.COMPANY_ADMINISTRATOR, Role.TRANSACTION_POINT_MANAGER, Role.GATHERING_POINT_MANAGER })]
	public async Task<IActionResult> UpdateAsync(Guid id, UpdatePointModel model)
	{
		await _pointService.UpdateAsync(id, model);
		return Ok(new { message = "Update point successfully!" });
	}
}
using MagicPostApi.Enums;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("admin/[action]")]
[VerifyToken]
[VerifyRole(new Role[] { Role.COMPANY_ADMINISTRATOR, Role.GATHERING_POINT_MANAGER })]
public class CompanyAdmisistratorController : ControllerBase
{

	private readonly IPointService _pointService;
	public CompanyAdmisistratorController(IPointService pointService)
	{
		_pointService = pointService;
	}

	[HttpGet]
	public async Task<List<Point>> GetAllTransactionPoints()
			=> await _pointService.GetAllTransactionPointsAsync();

	[HttpGet]
	public async Task<List<Point>> GetAllGatheringPoints()
			=> await _pointService.GetAllGatheringPointsAsync();
}
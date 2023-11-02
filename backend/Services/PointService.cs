using MagicPostApi.Configs;
using MagicPostApi.Models;
using MagicPostApi.Enums;
using Microsoft.EntityFrameworkCore;

namespace MagicPostApi.Services;

public interface IPointService
{
	Task<List<Point>> GetAllTransactionPointsAsync();
	Task<List<Point>> GetAllGatheringPointsAsync();
}

public class PointService : IPointService
{
	private readonly Config _config;
	private readonly WebAPIDataContext _webAPIDataContext;
	public PointService(Config config, WebAPIDataContext webAPIDataContext)
	{
		_config = config;
		_webAPIDataContext = webAPIDataContext;
	}
	public async Task<List<Point>> GetAllTransactionPointsAsync()
			=> await _webAPIDataContext.Points.Where(p => p.Type == PointType.TransactionPoint).ToListAsync();
	public async Task<List<Point>> GetAllGatheringPointsAsync()
			=> await _webAPIDataContext.Points.Where(p => p.Type == PointType.GatheringPoint).ToListAsync();
}
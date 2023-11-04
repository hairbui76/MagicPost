using MagicPostApi.Configs;
using MagicPostApi.Models;
using MagicPostApi.Enums;
using Microsoft.EntityFrameworkCore;
using MagicPostApi.Utils;
using System.Net;
using AutoMapper;

namespace MagicPostApi.Services;

public interface IPointService
{
	Task<List<Point>> GetAllTransactionPointsAsync();
	Task<List<Point>> GetAllGatheringPointsAsync();
	Task<Point?> GetPointByIdAsync(Guid id);
	Task<List<User>> GetAllTransactionPointManagersAsync();
	Task<List<User>> GetAllGatheringPointManagersAsync();
	Task CreateAsync(Point newPoint);
	Task UpdateAsync(Guid id, UpdatePointModel model);
}

public class PointService : IPointService
{
	private readonly Config _config;
	private readonly IMapper _mapper;
	private readonly WebAPIDataContext _webAPIDataContext;
	public PointService(Config config, IMapper mapper, WebAPIDataContext webAPIDataContext)
	{
		_config = config;
		_mapper = mapper;
		_webAPIDataContext = webAPIDataContext;
	}
	public async Task<List<Point>> GetAllTransactionPointsAsync()
			=> await _webAPIDataContext.Points.Where(p => p.Type == PointType.TransactionPoint).ToListAsync();

	public async Task<List<Point>> GetAllGatheringPointsAsync()
			=> await _webAPIDataContext.Points.Where(p => p.Type == PointType.GatheringPoint).ToListAsync();

	public async Task<Point?> GetPointByIdAsync(Guid id)
			=> await _webAPIDataContext.Points.Where(p => p.Id == id).FirstOrDefaultAsync();

	public async Task<List<User>> GetAllTransactionPointManagersAsync()
			=> await _webAPIDataContext.Users.Where(p => p.Role == Role.TRANSACTION_POINT_MANAGER).ToListAsync();

	public async Task<List<User>> GetAllGatheringPointManagersAsync()
			=> await _webAPIDataContext.Users.Where(p => p.Role == Role.GATHERING_POINT_MANAGER).ToListAsync();

	public async Task CreateAsync(Point newPoint)
	{
		await _webAPIDataContext.Points.AddAsync(newPoint);
		await _webAPIDataContext.SaveChangesAsync();
	}

	public async Task UpdateAsync(Guid id, UpdatePointModel model)
	{
		Point point = await GetPointByIdAsync(id) ?? throw new AppException(HttpStatusCode.NotFound, "Point not found");
		_mapper.Map(model, point);
		_webAPIDataContext.Points.Update(point);
		_webAPIDataContext.SaveChanges();
	}
}

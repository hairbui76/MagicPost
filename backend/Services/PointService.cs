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
	Task<List<Point>> GetAsync();
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
	private readonly IMapper _mapper;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly DbSet<Point> _pointsRepository;
	public PointService(IMapper mapper, WebAPIDataContext webAPIDataContext)
	{
		_mapper = mapper;
		_webAPIDataContext = webAPIDataContext;
		_pointsRepository = webAPIDataContext.Points;
	}
	public async Task<List<Point>> GetAsync()
			=> await _pointsRepository.ToListAsync();

	public async Task<List<Point>> GetAllTransactionPointsAsync()
			=> await _pointsRepository.Where(p => p.Type == PointType.TransactionPoint).ToListAsync();

	public async Task<List<Point>> GetAllGatheringPointsAsync()
			=> await _pointsRepository.Where(p => p.Type == PointType.GatheringPoint).ToListAsync();

	public async Task<Point?> GetPointByIdAsync(Guid id)
			=> await _pointsRepository.Where(p => p.Id == id).FirstOrDefaultAsync();

	public async Task<List<User>> GetAllTransactionPointManagersAsync()
			=> await _webAPIDataContext.Users.Where(p => p.Role == Role.TRANSACTION_POINT_MANAGER).ToListAsync();

	public async Task<List<User>> GetAllGatheringPointManagersAsync()
			=> await _webAPIDataContext.Users.Where(p => p.Role == Role.GATHERING_POINT_MANAGER).ToListAsync();

	public async Task CreateAsync(Point newPoint)
	{
		await _pointsRepository.AddAsync(newPoint);
		await _webAPIDataContext.SaveChangesAsync();
	}

	public async Task UpdateAsync(Guid id, UpdatePointModel model)
	{
		Point point = await GetPointByIdAsync(id) ?? throw new AppException(HttpStatusCode.NotFound, "Point not found");
		_mapper.Map(model, point);
		_pointsRepository.Update(point);
		_webAPIDataContext.SaveChanges();
	}
}

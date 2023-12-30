using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Enums;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;

namespace MagicPostApi.Services;

public interface IDeliveryService
{
	Task<List<Delivery>> GetAsync();
	Task<Delivery?> GetAsync(Guid id);
	Task CreateAsync(Delivery newDelivery);
	Task<DataPagination<DeliveryHistory>> GetDeliveryHistory(User user, string? type, string? status, int pageNumber);
}

public class DeliveryServce : IDeliveryService
{
	private readonly IMapper _mapper;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly DbSet<Delivery> _deliveriesRepository;
	public DeliveryServce(IMapper mapper, WebAPIDataContext webAPIDataContext)
	{
		_mapper = mapper;
		_webAPIDataContext = webAPIDataContext;
		_deliveriesRepository = webAPIDataContext.Deliveries;
	}
	public async Task<List<Delivery>> GetAsync()
			=> await _deliveriesRepository.ToListAsync();

	public async Task<Delivery?> GetAsync(Guid id)
			=> await _deliveriesRepository
						.Where(d => d.Id == id)
						.Include(d => d.Order)
						.Include(d => d.FromPoint)
						.Include(d => d.ToPoint)
						.FirstOrDefaultAsync();

	public async Task CreateAsync(Delivery newDelivery)
	{
		await _deliveriesRepository.AddAsync(newDelivery);
		await _webAPIDataContext.SaveChangesAsync();
	}

	public async Task<DataPagination<DeliveryHistory>> GetDeliveryHistory(User user, string? type, string? status, int pageNumber)
	{
		Point? currentPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.Id == user.PointId);
		var relatedDelivery = await _deliveriesRepository
												.Where(d => d.FromPointId == currentPoint!.Id || d.ToPointId == currentPoint.Id)
												.Include(d => d.ToPoint)
												.Include(d => d.FromPoint)
												.ToListAsync();
		List<DeliveryHistory> deliveryHistory = new();
		relatedDelivery.ForEach(d => deliveryHistory.AddRange(d.GetOperationDeliveryHistory()));
		if (type != null)
		{
			deliveryHistory = deliveryHistory.Where(d => d.Type == type).ToList();
		}
		if (status != null)
		{
			deliveryHistory = deliveryHistory.Where(d => d.Status == status).ToList();
		}
		deliveryHistory.ForEach(his =>
		{
			Point? targetPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.Id == his.Destination.Id);
			Order? order = _webAPIDataContext.Orders.FirstOrDefault(o => o.Id == his.OrderId);
			if (his.Type == "outgoing" && order?.ReceiverProvince == currentPoint?.Province && order?.ReceiverDistrict == currentPoint?.District && currentPoint.Type == PointType.TRANSACTION_POINT)
			{
				his.Destination = null;
				his.ToUser = true;
			}
			else
			{
				his.Destination = targetPoint;
			}
		});
		int count = deliveryHistory.Count;
		deliveryHistory = deliveryHistory.OrderBy(d => d.Time).Skip((int)Pagination.PAGESIZE * (pageNumber - 1)).Take((int)Pagination.PAGESIZE).ToList();
		return new DataPagination<DeliveryHistory>(deliveryHistory, count, pageNumber);
	}
}
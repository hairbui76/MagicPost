using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MagicPostApi.Services;

public interface IDeliveryService
{
	Task<List<Delivery>> GetAsync();
	Task<Delivery?> GetAsync(Guid id);
	Task CreateAsync(Delivery newDelivery);
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
}
using System.Net;
using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace MagicPostApi.Services;

public interface IUserService
{
	Task<List<User>> GetAsync();
	Task<User?> GetAsyncById(Guid id);
	Task<User?> GetAsyncByUsername(string username);
	Task CreateAsync(User newUser);
	Task UpdateAsync(Guid id, UpdateUserModel model);
	Task<(string, DateTime)> PrepareAccessToken(PublicInfo info);
	Task<(string, DateTime)> PrepareRefreshToken(PublicInfo info);
}

public class UserService : IUserService
{
	private readonly IMapper _mapper;
	private readonly Config _config;
	private readonly MyPaseto _paseto;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly DbSet<User> _usersRepository;
	private readonly IDatabase _redis;
	private readonly IDataProtectionProvider _dataProtectionProvider;
	private readonly IDataProtector _protector;

	public UserService(IMapper mapper, Config config, MyPaseto paseto, MyRedis redis, WebAPIDataContext webAPIDataContext, IDataProtectionProvider dataProtectionProvider)
	{
		_mapper = mapper;
		_config = config;
		_paseto = paseto;
		_webAPIDataContext = webAPIDataContext;
		_usersRepository = _webAPIDataContext.Users;
		_dataProtectionProvider = dataProtectionProvider;
		_protector = _dataProtectionProvider.CreateProtector("auth");
		_redis = redis.GetDatabase();
	}

	public async Task<List<User>> GetAsync()
			=> await _usersRepository.ToListAsync();

	public async Task<User?> GetAsyncById(Guid id)
			=> await _usersRepository
						.Where(u => u.Id == id)
						// .Include(u => u.StaffPoint)
						// 	.ThenInclude(p => p != null ? p.Staffs : null)
						// .Include(u => u.StaffPoint)
						// 	.ThenInclude(p => p != null ? p.Manager : null)
						// .Include(u => u.ManagerPoint)
						// 	.ThenInclude(p => p != null ? p.Staffs : null)
						// .Include(u => u.ManagerPoint)
						// 	.ThenInclude(p => p != null ? p.Manager : null)
						.FirstOrDefaultAsync();

	public async Task<User?> GetAsyncByUsername(string username) =>
			await _usersRepository.FirstOrDefaultAsync(x => x.Username == username);

	public async Task CreateAsync(User newUser)
	{
		await _usersRepository.AddAsync(newUser);
		await _webAPIDataContext.SaveChangesAsync();
	}

	public async Task UpdateAsync(Guid id, UpdateUserModel model)
	{
		User user = await GetAsyncById(id) ?? throw new AppException(HttpStatusCode.NotFound, "User not found");
		_mapper.Map(model, user);
		_usersRepository.Update(user);
		_webAPIDataContext.SaveChanges();
	}

	public async Task RemoveAsync(Guid id) =>
			await _usersRepository.Where(c => c.Id == id).ExecuteDeleteAsync();

	public async Task<(string, DateTime)> PrepareAccessToken(PublicInfo info)
	{
		var accessToken = _paseto.Encode(info, _config.TOKEN.SECRET);
		var accessExp = DateTime.Now.AddHours(_config.TOKEN.TOKEN_EXPIRE_HOURS);
		await _redis.StringSetAsync("ac_" + info.Id, true, accessExp.TimeOfDay);
		accessToken = _protector.Protect(accessToken);
		return (accessToken, accessExp);
	}

	public async Task<(string, DateTime)> PrepareRefreshToken(PublicInfo info)
	{
		var refreshToken = _paseto.Encode(info, _config.TOKEN.REFRESH_SECRET);
		var refreshExp = DateTime.Now.AddDays(_config.TOKEN.REFRESH_TOKEN_EXPIRE_WEEKS * 7);
		await _redis.StringSetAsync("rf_" + info.Id, true, refreshExp.TimeOfDay);
		refreshToken = _protector.Protect(refreshToken);
		return (refreshToken, refreshExp);
	}
}
using MagicPostApi.Configs;
using MagicPostApi.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace MagicPostApi.Services;

public interface IUserService
{

}

public class UserService
{
	private readonly Config _config;
	private readonly MyPaseto _paseto;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly IDatabase _redis;
	private readonly IDataProtectionProvider _dataProtectionProvider;
	private readonly IDataProtector _protector;

	public UserService(Config config, MyPaseto paseto, MyRedis redis, WebAPIDataContext webAPIDataContext, IDataProtectionProvider dataProtectionProvider)
	{
		_config = config;
		_paseto = paseto;
		_webAPIDataContext = webAPIDataContext;
		_dataProtectionProvider = dataProtectionProvider;
		_protector = _dataProtectionProvider.CreateProtector("auth");
		_redis = redis.GetDatabase();
	}

	public async Task<List<User>> GetAsync() =>
			 await _webAPIDataContext.Users.ToListAsync();

	public async Task<User?> GetAsyncById(Guid id) =>
			await _webAPIDataContext.Users.FirstOrDefaultAsync(x => x.Id == id);

	public async Task<User?> GetAsyncByUsername(string username) =>
			await _webAPIDataContext.Users.FirstOrDefaultAsync(x => x.Username == username);

	public async Task CreateAsync(User newUser)
	{
		await _webAPIDataContext.Users.AddAsync(newUser);
		await _webAPIDataContext.SaveChangesAsync();
	}


	public async Task RemoveAsync(Guid id) =>
			await _webAPIDataContext.Users.Where(c => c.Id == id).ExecuteDeleteAsync();

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
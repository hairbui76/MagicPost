using System.Net;
using MagicPostApi.Configs;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace MagicPostApi.Middlewares;
class VerifyToken
{
	private readonly Config _config;
	private readonly MyPaseto _paseto;
	private readonly RequestDelegate _next;
	private readonly IDataProtectionProvider _dataProtectionProvider;
	private readonly IDataProtector _protector;
	private readonly IDatabase _redis;

	public VerifyToken(Config config, MyPaseto paseto, MyRedis redis, IDataProtectionProvider dataProtectionProvider, RequestDelegate next)
	{
		_config = config;
		_paseto = paseto;
		_dataProtectionProvider = dataProtectionProvider;
		_protector = _dataProtectionProvider.CreateProtector("auth");
		_redis = redis.GetDatabase();
		_next = next;
	}

	public async Task Invoke(HttpContext context)
	{
		string? accessToken = context.Request.Cookies["access_token"];
		string? refreshToken = context.Request.Cookies["refresh_token"];
		if (accessToken == null && refreshToken == null)
			throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
		else if (accessToken == null && refreshToken != null)
		{
			refreshToken = _protector.Unprotect(refreshToken);
			var payload = _paseto.Decode(refreshToken, _config.TOKEN.REFRESH_SECRET).Paseto.Payload["value"];
			if (payload == null)
				throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
			else
			{
				var str = payload.ToString();
				if (str != null)
				{
					User? user = JsonConvert.DeserializeObject<User>(str);
					if (user != null)
					{
						var isExist = _redis.StringGet("rf_" + user.Id);
						if (isExist == RedisValue.Null || isExist == false)
							throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
						else
						{
							context.Items["user"] = user;
							context.Items["reset_access"] = true;
							await _next(context);
						}
					}
				}
			}
		}
		else if (accessToken != null)
		{
			accessToken = _protector.Unprotect(accessToken);
			var payload = _paseto.Decode(accessToken, _config.TOKEN.SECRET).Paseto.Payload["value"];
			if (payload == null)
				throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
			else
			{
				var str = payload.ToString();
				if (str != null)
				{
					User? user = JsonConvert.DeserializeObject<User>(str);
					if (user != null)
					{
						var isExist = _redis.StringGet("ac_" + user.Id);
						if (isExist == RedisValue.Null || isExist == false)
							throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
						else
						{
							context.Items["user"] = user;
							await _next(context);
						}
					}
				}
			}
		}
	}
}

public class VerifyTokenMiddleware
{
	public void Configure(IApplicationBuilder app)
	{
		app.UseMiddleware<VerifyToken>();
	}
}

public class VerifyTokenAttribute : MiddlewareFilterAttribute
{
	public VerifyTokenAttribute() : base(typeof(VerifyTokenMiddleware))
	{ }
}
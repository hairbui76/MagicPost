using System.Net;
using MagicPostApi.Configs;
using MagicPostApi.Models;
using Microsoft.AspNetCore.DataProtection;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace MagicPostApi.Middlewares;
public class VerifyToken
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

	public async Task InvokeAsync(HttpContext context)
	{
		string? accessToken = context.Request.Cookies["access_token"];
		string? refreshToken = context.Request.Cookies["refresh_token"];
		if (accessToken == null && refreshToken == null)
		{
			await Unauthorized(context);
		}
		else if (accessToken == null && refreshToken != null)
		{
			refreshToken = _protector.Unprotect(refreshToken);
			var payload = _paseto.Decode(refreshToken, _config.TOKEN.REFRESH_SECRET).Paseto.Payload["value"];
			if (payload == null)
				await Unauthorized(context);
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
						{
							await Unauthorized(context);
						}
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
				await Unauthorized(context);
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
						{
							await Unauthorized(context);
						}
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

	public async Task Unauthorized(HttpContext context)
	{
		context.Response.ContentType = "application/json";
		context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
		await context.Response.WriteAsync("Unauthorized");
	}
}
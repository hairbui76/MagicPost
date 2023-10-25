using System.Text.Json.Serialization;
using MagicPostApi.Configs;
using MagicPostApi.Models;
using MagicPostApi.Services;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.Attributes;
using StackExchange.Redis;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthController : ControllerBase
{
	private readonly UserService _userService;
	private readonly ILogger<AuthController> _logger;

	public AuthController(ILogger<AuthController> logger, UserService userService)
	{
		_logger = logger;
		_userService = userService;
	}

	[HttpGet]
	[Route("/auth")]
	public async Task<IActionResult> Index()
	{
		User? user = (User?)HttpContext.Items["user"];
		if (user != null)
		{
			var info = user.GetPublicInfo();
			bool? resetAccess = (bool?)HttpContext.Items["reset_access"];
			if (resetAccess == true)
			{
				var access = await _userService.PrepareAccessToken(info);
				Response.Cookies.Append("access_token", access.Item1, new CookieOptions
				{
					Secure = Config.ENV == "production",
					HttpOnly = true,
					Path = "/",
					Expires = access.Item2,
				});
			}
			return Ok(new { message = "Authenticated!!", user = info });
		}
		return Unauthorized(new { message = "Unauthorized" });
	}

	[HttpGet]
	public async Task<List<User>> Get() => await _userService.GetAsync();

	[HttpGet("{id:length(24)}")]
	public async Task<ActionResult<User>> Get(Guid id)
	{
		var user = await _userService.GetAsyncById(id);
		if (user == null)
			return NotFound(new { message = "User not found" });
		return user;
	}

	[HttpPost]
	public async Task<IActionResult> Login([FromBody] LoginModel model)
	{
		if (model.Username == null)
			return Unauthorized(new { message = "Username is required" });
		if (model.Password == null)
			return Unauthorized(new { message = "Password is required" });
		User? user = await _userService.GetAsyncByUsername(model.Username);
		if (user == null)
			return NotFound(new { message = "User not found" });
		bool isPasswordMatch = Password.Verify(user.Password, model.Password);
		if (!isPasswordMatch)
			return Unauthorized(new { message = "Username or password incorrect" });
		var info = user.GetPublicInfo();
		var tasks = await Task.WhenAll(_userService.PrepareAccessToken(info), _userService.PrepareRefreshToken(info));
		Response.Cookies.Append("access_token", tasks[0].Item1, new CookieOptions
		{
			Secure = Config.ENV == "production",
			HttpOnly = true,
			Path = "/",
			Expires = tasks[0].Item2,
		});
		Response.Cookies.Append("refresh_token", tasks[1].Item1, new CookieOptions
		{
			Secure = Config.ENV == "production",
			HttpOnly = true,
			Path = "/",
			Expires = tasks[1].Item2,
		});
		return Ok(new { message = "Login sucessfully", user = info });
	}

	[HttpPost]
	public async Task<IActionResult> Register(User newUser)
	{
		newUser.Password = Password.Hash(newUser.Password);
		await _userService.CreateAsync(newUser);
		var info = newUser.GetPublicInfo();
		var tasks = await Task.WhenAll(_userService.PrepareAccessToken(info), _userService.PrepareRefreshToken(info));
		Response.Cookies.Append("access_token", tasks[0].Item1, new CookieOptions
		{
			Secure = Config.ENV == "production",
			HttpOnly = true,
			Path = "/",
			Expires = tasks[0].Item2,
		});
		Response.Cookies.Append("refresh_token", tasks[1].Item1, new CookieOptions
		{
			Secure = Config.ENV == "production",
			HttpOnly = true,
			Path = "/",
			Expires = tasks[1].Item2,
		});
		return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
	}

	[HttpPost]
	public IActionResult Logout()
	{
		Response.Cookies.Delete("access_token");
		Response.Cookies.Delete("refresh_token");
		return Ok(new { message = "Logout successfully" });
	}
}

public class LoginModel
{
	[BsonElement("username")]
	public string? Username { get; set; }
	[BsonElement("password")]
	public string? Password { get; set; }
}
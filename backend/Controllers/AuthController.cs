using MagicPostApi.Configs;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthController : ControllerBase
{
	private readonly Config _config;
	private readonly UserService _userService;
	public AuthController(Config config, UserService userService)
	{
		_config = config;
		_userService = userService;
	}

	[HttpGet]
	[Route("/auth")]
	[MiddlewareFilter(typeof(VerifyTokenMiddleware))]
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
					Secure = _config.ENV == "production",
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
			Secure = _config.ENV == "production",
			HttpOnly = true,
			Path = "/",
			Expires = tasks[0].Item2,
		});
		Response.Cookies.Append("refresh_token", tasks[1].Item1, new CookieOptions
		{
			Secure = _config.ENV == "production",
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
			Secure = _config.ENV == "production",
			HttpOnly = true,
			Path = "/",
			Expires = tasks[0].Item2,
		});
		Response.Cookies.Append("refresh_token", tasks[1].Item1, new CookieOptions
		{
			Secure = _config.ENV == "production",
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
	public string? Username { get; set; }
	public string? Password { get; set; }
}
using System.Net;
using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthController : ControllerBase
{
	private readonly IMapper _mapper;
	private readonly Config _config;
	private readonly IUserService _userService;
	public AuthController(IMapper mapper, Config config, IUserService userService)
	{
		_mapper = mapper;
		_config = config;
		_userService = userService;
	}

	[HttpGet]
	[Route("/auth")]
	[MiddlewareFilter(typeof(VerifyTokenMiddleware))]
	public async Task<IActionResult> Index()
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
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
	public async Task<IActionResult> Login(LoginModel model)
	{
		if (model.Username == null)
			throw new AppException("Username is required");
		if (model.Password == null)
			throw new AppException("Password is required");
		User? user = await _userService.GetAsyncByUsername(model.Username) ?? throw new AppException(HttpStatusCode.NotFound, "User not found");
		bool isPasswordMatch = Password.Verify(user.Password, model.Password);
		if (!isPasswordMatch)
			throw new AppException("Username or password incorrect");
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
	public async Task<IActionResult> Register(RegisterModel model)
	{
		User newUser = _mapper.Map<User>(model);
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
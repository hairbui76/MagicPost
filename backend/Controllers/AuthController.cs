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
	[VerifyToken]
	[VerifyPointAndAdmin]
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

	[HttpPost]
	public async Task<IActionResult> Login(LoginModel model)
	{
		if (model.Username == null && model.Email == null) throw new AppException("Please provide username or email to login");
		User loginUser = _mapper.Map<User>(model);
		User user;
		if (model.Username != null)
			user = await _userService.GetAsyncByUsername(loginUser.Username) ?? throw new AppException(HttpStatusCode.NotFound, "User not found");
		else
			user = await _userService.GetAsyncByEmail(loginUser.Email) ?? throw new AppException(HttpStatusCode.NotFound, "User not found");
		bool isPasswordMatch = Password.Verify(user.Password, loginUser.Password);
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
		return Ok(new { message = "Register successfully!", user = info });
	}

	[HttpPost]
	public IActionResult Logout()
	{
		Response.Cookies.Delete("access_token");
		Response.Cookies.Delete("refresh_token");
		return Ok(new { message = "Logout successfully" });
	}
}
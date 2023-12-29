using System.Net;
using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Enums;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
	private readonly IMapper _mapper;
	private readonly Config _config;
	private readonly IUserService _userService;
	private readonly IPointService _pointService;
	public UserController(IMapper mapper, Config config, IUserService userService, IPointService pointService)
	{
		_mapper = mapper;
		_config = config;
		_userService = userService;
		_pointService = pointService;
	}

	[HttpPost]
	public async Task<ActionResult<Response<PublicUserInfo>>> CreateAsync(CreateUserModel model)
	{
		User newUser = _mapper.Map<User>(model);
		newUser.Password = Password.Hash(Password.DEFAULT_PASSWORD);
		Point? point = await _pointService.AssignStaff(newUser.Role, model.Province!, model.District!) ?? throw new AppException("Point not found in this area!");
		newUser.PointId = point.Id;
		await _userService.CreateAsync(newUser);
		return Ok(new Response<PublicUserInfo>("Create staff successfully!", newUser.GetPublicInfo()));
	}

	[HttpGet]
	public async Task<ActionResult<Response<List<User>>>> GetAsync()
	{
		List<User> users = await _userService.GetAsync();
		return Ok(new Response<List<User>>("Get users successfully!", users));
	}

	[HttpGet]
	[VerifyToken]
	public async Task<ActionResult<Response<DataPagination<PublicUserInfo>>>> FilterAsync(int pageNumber, Role? role)
	{
		DataPagination<PublicUserInfo> users = await _userService.FilterAsync(pageNumber, role);
		return Ok(new Response<DataPagination<PublicUserInfo>>("Get users successfully", users));
	}

	[HttpGet("{id}")]
	// [VerifyOwner]
	[VerifyToken]
	// [VerifyRole(Role.COMPANY_ADMINISTRATOR)]
	public async Task<ActionResult<Response<PublicUserInfo>>> GetAsync(Guid id)
	{
		PublicUserInfo user = await _userService.GetAsyncById(id) ?? throw new AppException(HttpStatusCode.NotFound, "User not found");
		return new Response<PublicUserInfo>("Get users successfully", user);
	}

	[HttpPut("{id}")]
	[VerifyToken]
	public async Task<ActionResult> UpdateUserAsync(Guid id, UpdateUserModel model)
	{
		await _userService.UpdateAsync(id, model);
		return Ok(new { message = "Update user successfully!" });
	}

	[HttpPost]
	public async Task<IActionResult> CreateTransactionStaffAsync(CreateUserModel model)
	{
		User user = _mapper.Map<User>(model);
		user.Password = Password.Hash(user.Password);
		user.Role = Role.TRANSACTION_STAFF;
		await _userService.CreateAsync(user);
		return CreatedAtAction(nameof(GetAsync), new { id = user.Id }, new { message = "Create transaction staff successfully!", user });
	}

	[HttpPost]
	public async Task<IActionResult> CreateGatheringStaffAsync(CreateUserModel model)
	{
		User user = _mapper.Map<User>(model);
		user.Password = Password.Hash(user.Password);
		user.Role = Role.GATHERING_STAFF;
		await _userService.CreateAsync(user);
		return CreatedAtAction(nameof(GetAsync), new { id = user.Id }, new { message = "Create transaction staff successfully!", user });
	}
}
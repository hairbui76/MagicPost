using AutoMapper;
using MagicPostApi.Configs;
using MagicPostApi.Enums;
using MagicPostApi.Middlewares;
using MagicPostApi.Models;
using MagicPostApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MagicPostApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
	private readonly IMapper _mapper;
	private readonly Config _config;
	private readonly IUserService _userService;
	public UserController(IMapper mapper, Config config, IUserService userService)
	{
		_mapper = mapper;
		_config = config;
		_userService = userService;
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
	[VerifyOwner]
	[VerifyToken]
	[VerifyRole(new Role[] { Role.COMPANY_ADMINISTRATOR })]
	public async Task<ActionResult<User>> GetAsync(Guid id)
	{
		var user = await _userService.GetAsyncById(id);
		if (user == null)
			return NotFound(new { message = "User not found" });
		return user;
	}

	[HttpPut("{id}")]
	[VerifyOwner]
	[VerifyToken]
	public async Task<ActionResult> UpdateUserAsync(Guid id, UpdateUserModel model)
	{
		await _userService.UpdateAsync(id, model);
		return Ok(new { message = "Update user successfully!" });
	}

	[HttpPost]
	public async Task<IActionResult> CreateTransactionStaffAsync(RegisterModel model)
	{
		User user = _mapper.Map<User>(model);
		user.Role = Role.TRANSACION_STAFF;
		await _userService.CreateAsync(user);
		return CreatedAtAction(nameof(GetAsync), new { id = user.Id }, new { message = "Create transaction staff successfully!", user });
	}

	[HttpPost]
	public async Task<IActionResult> CreateGatheringStaffAsync(RegisterModel model)
	{
		User user = _mapper.Map<User>(model);
		user.Role = Role.GATHERING_STAFF;
		await _userService.CreateAsync(user);
		return CreatedAtAction(nameof(GetAsync), new { id = user.Id }, new { message = "Create transaction staff successfully!", user });
	}
}
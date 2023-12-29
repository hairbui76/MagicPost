using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;

namespace MagicPostApi.Models;

public class User : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required string Name { get; set; }
	public required string Username { get; set; }
	public required string Email { get; set; }
	public required string PhoneNumber { get; set; }
	public required string Password { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public Role Role { get; set; }
	public Guid? PointId { get; set; }
	public Point? Point { get; }
	public PublicUserInfo GetPublicInfo()
			=> new() { Id = Id, Name = Name, Username = Username, Email = Email, PhoneNumber = PhoneNumber, PointId = PointId, Role = Role };
	public PublicUserInfo GetPublicUserInfoWithPoint()
			=> new() { Id = Id, Name = Name, Username = Username, Email = Email, PhoneNumber = PhoneNumber, PointId = PointId, Role = Role, Point = Point?.GetPublicPointInfo() };
}

public class PublicUserInfo
{
	public Guid? Id { get; set; }
	public required string Name { get; set; }
	public required string Username { get; set; }
	public required string Email { get; set; }
	public required string PhoneNumber { get; set; }
	public required Role Role { get; set; }
	public Guid? PointId { get; set; }
	public PublicPointInfo? Point { get; set; }
}

public class LoginModel : Model
{
	public string? Email { get; set; }
	public string? Username { get; set; }
	[Required]
	public string? Password { get; set; }
}

public class CreateUserModel : Model
{
	[Required]
	public string? Name { get; set; }
	[Required]
	public string? Email { get; set; }
	[Required]
	public string? PhoneNumber { get; set; }
	[Required]
	public string? Username { get; set; }
	[Required]
	public Role Role { get; set; }
	[Required]
	public string? Province { get; set; }
	[Required]
	public string? District { get; set; }
	[Required]
	public string? Ward { get; set; }
}

public class RegisterModel : Model
{
	[Required]
	public string? Name { get; set; }
	[Required]
	public string? Email { get; set; }
	[Required]
	public string? PhoneNumber { get; set; }
	[Required]
	public string? Username { get; set; }
	[Required]
	public string? Password { get; set; }
	[Required]
	public Role Role { get; set; }
	public Guid? PointId { get; set; }
}

public class UpdateUserModel : Model
{
	[Required]
	public string? Name { get; set; }
	[Required]
	public string? Email { get; set; }
	[Required]
	public string? PhoneNumber { get; set; }
	[Required]
	public string? Username { get; set; }
	[Required]
	public Role Role { get; set; }
	public Guid? PointId { get; set; }
}

public class UserResponse : Response<User>
{
	public UserResponse(string Message, User? Data) : base(Message, Data) { }
	public UserResponse() { }
}

public class UserListResponse : Response<List<User>>
{
	public UserListResponse(string Message, List<User>? Data) : base(Message, Data) { }
	public UserListResponse() { }
}
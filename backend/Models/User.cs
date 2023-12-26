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
	public required string Password { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public Role Role { get; set; }
	public Guid? PointId { get; set; }
	public Point? Point { get; }
	public PublicUserInfo GetPublicInfo()
			=> new() { Id = Id, Name = Name, Username = Username, Email = Email, PointId = PointId };
}

public class PublicUserInfo
{
	public Guid? Id { get; set; }
	public required string Name { get; set; }
	public required string Username { get; set; }
	public required string Email { get; set; }
	public Guid? PointId { get; set; }
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
	public string? Username { get; set; }
	[Required]
	public string? Password { get; set; }
	[Required]
	public Role Role { get; set; }
	public Guid? PointId { get; set; }
}

public class UpdateUserModel : Model
{
	public string? Name { get; set; }
	public string? Username { get; set; }
	public string? Email { get; set; }
	public string? Password { get; set; }
	public Guid? StaffPointId { get; set; }
	public Guid? ManagerPointId { get; set; }
}
using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;

namespace MagicPostApi.Models;

public class User : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required string Name { get; set; }
	public required string Username { get; set; }
	public required string Password { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public Role Role { get; set; }
	// If user is staff or manager, associate with a point
	public Guid? PointId { get; set; }

	// Get public user information
	public PublicInfo GetPublicInfo()
			=> new() { Id = Id, Name = Name, Username = Username };
}

public class PublicInfo
{
	public Guid? Id { get; set; }
	public required string Name { get; set; }
	public required string Username { get; set; }
}

public class LoginModel : Model
{
	public string? Username { get; set; }
	public string? Password { get; set; }
}

public class RegisterModel : Model
{
	[Required]
	public string? Name { get; set; }
	[Required]
	public string? Username { get; set; }
	[Required]
	public string? Password { get; set; }
}

public class UpdateUserModel : Model
{
	public string? Name { get; set; }
	public string? Username { get; set; }
	public string? Password { get; set; }
	// If user is staff or manager, associate with a point
	public Guid? PointId { get; set; }
}
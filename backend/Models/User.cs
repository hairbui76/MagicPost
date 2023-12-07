using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
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
	// If user is staff, associate with a point
	public Guid? StaffPointId { get; set; }
	// Reference to the point that user is staff
	public Point? StaffPoint { get; }
	// If user is manager, associate with a point
	public Guid? ManagerPointId { get; set; }
	// Reference to the point that user is manager
	public Point? ManagerPoint { get; }

	// Get public user information
	public PublicInfo GetPublicInfo()
			=> new() { Id = Id, Name = Name, Username = Username, Email = Email };
}

public class PublicInfo
{
	public Guid? Id { get; set; }
	public required string Name { get; set; }
	public required string Username { get; set; }
	public required string Email { get; set; }
}

public class LoginModel : Model
{
	public string? Email { get; set; }
	public string? Username { get; set; }
	[Required]
	public string? Password { get; set; }
}

public class RegisterModel : Model
{
	[Required]
	public string? Name { get; set; }
	[Required]
	public string? Email { get; set; }
	[Required]
	public string? Username { get; set; }
	[Required]
	public string? Password { get; set; }
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
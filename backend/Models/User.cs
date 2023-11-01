using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
	public Guid? PointId {get; set;}
	public Point? Point {get; set;} 
	public ICollection<Delivery>? Deliveries {get; set;}
 	public PublicInfo GetPublicInfo()
	{
		return new PublicInfo { Id = Id, Name = Name, Username = Username };
	}
}

public class PublicInfo
{
	public Guid? Id { get; set; }
	public required string Name { get; set; }
	public required string Username { get; set; }
}

public class LoginModel
{
	public string? Username { get; set; }
	public string? Password { get; set; }
}

public class RegisterModel
{
	public string? Name { get; set; }
	public string? Username { get; set; }
	public string? Password { get; set; }
}
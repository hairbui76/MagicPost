using System.ComponentModel.DataAnnotations;

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
using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;

namespace MagicPostApi.Models;

public class Point : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required string PointName { get; set; }
	public required PointType Type { get; set; }
	public required string Address { get; set; }
	public required float AddressLat { get; set; }
	public required float AddressLong { get; set; }
	public required string Province { get; set; }
	public required string District { get; set; }
	public required string Ward { get; set; }
	[EmailAddress]
	public string? Email { get; set; }
	[Phone]
	public string? Phone { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public List<User> Staffs { get; } = new List<User>();
	public PublicPointInfo GetPublicPointInfo()
			=> new()
			{
				Id = Id,
				Type = Type,
				PointName = PointName,
				Address = new()
				{
					Name = Address,
					Lat = AddressLat,
					Long = AddressLong,
					Province = Province,
					District = District,
					Ward = Ward
				},
				Email = Email,
				Phone = Phone,
				CreatedAt = CreatedAt
			};
}

public class PublicPointInfo : Model
{
	public Guid? Id { get; set; }
	public PointType? Type { get; set; }
	public string? PointName { get; set; }
	public Address? Address { get; set; }
	public string? Email { get; set; }
	public string? Phone { get; set; }
	public DateTime? CreatedAt { get; set; }
}

public class CreatePointModel : Model
{
	[Required]
	public string? PointName { get; set; }
	[Required]
	public PointType? Type { get; set; }
	[Required]
	public string? Address { get; set; }
	[Required]
	public float? AddressLat { get; set; }
	[Required]
	public float? AddressLong { get; set; }
	[Required]
	public string? Province { get; set; }
	[Required]
	public string? District { get; set; }
	[Required]
	public string? Ward { get; set; }
	[Required]
	[EmailAddress]
	public string? Email { get; set; }
	[Required]
	[Phone]
	public string? Phone { get; set; }
}

public class UpdatePointModel : Model
{
	[Required]
	public string? PointName { get; set; }
	[Required]
	public PointType? Type { get; set; }
	[Required]
	public string? Address { get; set; }
	[Required]
	public float? AddressLat { get; set; }
	[Required]
	public float? AddressLong { get; set; }
	[Required]
	public string? Province { get; set; }
	[Required]
	public string? District { get; set; }
	[Required]
	public string? Ward { get; set; }
	[Required]
	[EmailAddress]
	public string? Email { get; set; }
	[Required]
	[Phone]
	public string? Phone { get; set; }
}
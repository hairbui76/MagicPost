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
	public Guid? ManagerId { get; set; }
	public User? Manager { get; }
	[EmailAddress]
	public string? Email { get; set; }
	[Phone]
	public string? Phone { get; set; }
	public List<User> Staffs { get; } = new List<User>();
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
	public string? PointName { get; set; }
	public string? ZipCode { get; set; }
	public string? Address { get; set; }
	[EmailAddress]
	public string? Email { get; set; }
	[Phone]
	public string? Phone { get; set; }
}
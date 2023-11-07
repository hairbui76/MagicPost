using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;

namespace MagicPostApi.Models;

public class Point : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required string PointName { get; set; }
	public required string ZipCode { get; set; }
	public required PointType Type { get; set; }
	public string? Address { get; set; }
	[EmailAddress]
	public string? Email { get; set; }
	[Phone]
	public string? Phone { get; set; }
	// Associate point with a manager
	public Guid? ManagerId { get; set; }
}

public class CreatePointModel : Model
{
	public PointType Type { get; set; }
	[Required]
	public string? PointName { get; set; }
	[Required]
	public string? ZipCode { get; set; }
	[Required]
	public string? Address { get; set; }
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
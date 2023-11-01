using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;

namespace MagicPostApi.Models;

public class Point : Model
{
	[Key]
	public Guid? Id { get; set; }
	[Required]
	public string? PointName { get; set; }
	[Required]
	public string? ZipCode { get; set; }
	public PointType Type { get; set; }
	public string? Address { get; set; }
	[EmailAddress]
	public string? Email { get; set; }
	[Phone]
	public string? Phone { get; set; }
	public Guid? ManagerId { get; set; }
	public User? Manager { get; set; }
	public ICollection<User> Staffs { get; set; } = new List<User>();
}


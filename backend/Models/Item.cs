using System.ComponentModel.DataAnnotations;

namespace MagicPostApi.Models;
public class Item
{
	[Key]
	public Guid? Id { get; set; }
	public string? Name { get; set; }
	public int Quantity { get; set; }
	public double Weight { get; set; }
	public double Value { get; set; }
	public Guid? OrderId { get; set; }
}
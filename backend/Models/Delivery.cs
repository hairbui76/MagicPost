using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;

namespace MagicPostApi.Models;
public class Delivery : Model
{
	[Key]
	public Guid? Id { get; set; }
	// Associated with a point that send delivery package from
	public required Guid FromPointId { get; set; }
	// Associated with a point that send delivery package to
	public required Guid ToPointId { get; set; }
	// Associated with an order
	public required Guid OrderId { get; set; }
	public DeliveryState State { get; set; }
	public DateTime? SendTime { get; set; }
	public DateTime? ReceiveTime { get; set; }
}
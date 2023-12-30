using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;
using Microsoft.AspNetCore.SignalR;

namespace MagicPostApi.Models;
public class Delivery : Model
{
	[Key]
	public Guid? Id { get; set; }
	// Associated with a point that send delivery package from
	public Guid? FromPointId { get; set; }
	// Reference to a point that send delivery package
	public Point? FromPoint { get; }
	// Associated with a point that send delivery package to
	public Guid? ToPointId { get; set; }
	// Reference to a point that receive delivery package
	public Point? ToPoint { get; }
	// Associated with an order
	public Guid? OrderId { get; set; }
	// Reference to order
	public Order? Order { get; }
	public DeliveryState State { get; set; }
	public DateTime? ReceiveTime { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public Delivery() { }
}

public class CreateDeliveryModel : Model
{
	[Required]
	public Guid? FromPointId { get; set; }
	[Required]
	public Guid? ToPointId { get; set; }
	[Required]
	public Guid? OrderId { get; set; }
}

public class DeliveryHistory : Model
{
	public Guid? OrderId { get; set; }
	public string? Type { get; set; }
	public Point? Destination { get; set; }
	public string? Status { get; set; }
	public string? Reason { get; set; }
	public DateTime? Time { get; set; } = DateTime.UtcNow;
	public bool ToUser { get; set; } = false;
}
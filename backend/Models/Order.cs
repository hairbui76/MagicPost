using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace MagicPostApi.Models;
public class Order : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required OrderState State { get; set; } = OrderState.PENDING;
	public required DateTime CreateAt { get; set; } = DateTime.UtcNow;
	public DateTime? CancelAt { get; set; }
	public required string SenderName { get; set; }
	public required string SenderAddress { get; set; }
	[Phone]
	public required string SenderPhone { get; set; }
	public required string Receiver { get; set; }
	public required string ReceiverAddress { get; set; }
	[Phone]
	public required string ReceiverPhone { get; set; }
	// Reference to list of delivery
	public List<Delivery> Deliveries { get; } = new List<Delivery>();
}

public class CreateOrderModel : Model
{
	[Required]
	public string? SenderName { get; set; }
	[Required]
	public string? SenderAddress { get; set; }
	[Required]
	[Phone]
	public string? SenderPhone { get; set; }
	[Required]
	public string? Receiver { get; set; }
	[Required]
	public string? ReceiverAddress { get; set; }
	[Required]
	[Phone]
	public string? ReceiverPhone { get; set; }
}

public class UpdateOrderModel
{
	public OrderState State { get; set; }
	public string? SenderName { get; set; }
	public string? SenderAddress { get; set; }
	[Phone]
	public string? SenderPhone { get; set; }
	public string? Receiver { get; set; }
	public string? ReceiverAddress { get; set; }
	[Phone]
	public string? ReceiverPhone { get; set; }
}
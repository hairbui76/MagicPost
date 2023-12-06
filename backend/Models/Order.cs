using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace MagicPostApi.Models;
public class Order : Model
{
	[Key]
	public Guid? Id { get; set; }
	public DateTime? CancelAt { get; set; }
	[Required]
	public required string SenderName { get; set; }
	[Required]
	public required string SenderAddress { get; set; }
	[Required]
	[Phone]
	public required string SenderPhone { get; set; }
	[Required]
	public required string ReceiverName { get; set; }
	[Required]
	public required string ReceiverAddress { get; set; }
	[Required]
	[Phone]
	public required string ReceiverPhone { get; set; }
	public List<Delivery>? Deliveries { get; } = new List<Delivery>();
	public IEnumerable<Item>? Items { get; set; }
	public string Properties { get; set; }
	public string Type { get; set; }
	public int Cod { get; set; }
	[Required]
	public string Payer { get; set; }
	public string? Note { get; set; }
	public required string State { get; set; } = nameof(OrderState.PENDING);
	public required DateTime CreateAt { get; set; } = DateTime.UtcNow;
}

public class CreateOrderModel : Model
{
	public CustomerProps Sender { get; set; } 
	public CustomerProps Receiver { get; set; } 
	public PackageInfo PackageInfo { get; set; } 
	public ExtraData ExtraData { get; set; } 
	public DateTime CreateAt { get; set; } 
	public string Status { get; set; } 
}

public class ItemProps {
	public Guid? Id { get; set; }
	public string Name { get; set; }
	public int Quantity { get; set; }
	public double Value { get; set; }
	public double Weight { get; set; }
}

public class PackageInfo {
	public string Type { get; set; }
	public ItemProps[] Items { get; set; }
	public List<string> Properties { get; set; }
}

public class ExtraData {
	public double Cod { get; set; }
	public string Payer { get; set; }
	public string Note { get; set; }
}

public class CustomerProps {
	public string Name { get; set; }
	public string Address { get; set; }
	public string Phone { get; set; }
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
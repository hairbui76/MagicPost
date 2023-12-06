using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace MagicPostApi.Models;
public class Order : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required string SenderName { get; set; }
	public required string SenderAddress { get; set; }
	[Phone]
	public required string SenderPhone { get; set; }
	public required string ReceiverName { get; set; }
	public required string ReceiverAddress { get; set; }
	[Phone]
	public required string ReceiverPhone { get; set; }
	public IList<Delivery> Deliveries { get; } = new List<Delivery>();
	public List<Item> Items { get; set; } = new List<Item>();
	public string? Properties { get; set; }
	public string? Type { get; set; }
	public int Cod { get; set; }
	public required string Payer { get; set; }
	public string? Note { get; set; }
	public required string State { get; set; } = nameof(OrderState.PENDING);
	public DateTime CreatedAt = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public OrderState Status { get; set; } = OrderState.PENDING;
}

public class CreateOrderModel : Model
{
	[Required]
	public required CustomerProps Sender { get; set; }
	[Required]
	public required CustomerProps Receiver { get; set; }
	[Required]
	public required PackageInfo PackageInfo { get; set; }
	[Required]
	public required ExtraData ExtraData { get; set; }
}

public class ItemProps
{
	public Guid? Id { get; set; }
	public string? Name { get; set; }
	public int Quantity { get; set; }
	public double Value { get; set; }
	public double Weight { get; set; }
}

public class PackageInfo
{
	public string? Type { get; set; }
	public IList<ItemProps> Items { get; set; } = new List<ItemProps>();
	public IList<string> Properties { get; set; } = new List<string>();
}

public class ExtraData
{
	public double Cod { get; set; }
	public string? Payer { get; set; }
	public string? Note { get; set; }
}

public class CustomerProps
{
	public string? Name { get; set; }
	public string? Address { get; set; }
	public string? Phone { get; set; }
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
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
	public required string Properties { get; set; }
	public string? Type { get; set; }
	public int Cod { get; set; }
	public required string Payer { get; set; }
	public string? Note { get; set; }
	public required string State { get; set; } = nameof(OrderState.PENDING);
	public DateTime CreatedAt = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public OrderState Status { get; set; } = OrderState.PENDING;
	public PublicOrderInfo GetPublicOrderInfo()
			=> new()
			{
				Id = Id,
				CreatedAt = CreatedAt,
				Status = Status,
				Sender = new() { Name = SenderName, Address = SenderAddress, Phone = SenderPhone },
				Receiver = new() { Name = ReceiverName, Address = ReceiverAddress, Phone = ReceiverPhone },
				PackageInfo = new() { Type = Type, Items = Items, Properties = Properties.Split("-").ToList() },
				ExtraData = new() { Cod = Cod, Payer = Payer, Note = Note },
			};
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

public class PublicOrderInfo : Model
{
	public Guid? Id { get; set; }
	public DateTime? CreatedAt { get; set; }
	public OrderState? Status { get; set; }
	public required CustomerProps Sender { get; set; }
	public required CustomerProps Receiver { get; set; }
	public required PackageInfo PackageInfo { get; set; }
	public required ExtraData ExtraData { get; set; }
}

public class PackageInfo
{
	public string? Type { get; set; }
	public List<Item> Items { get; set; } = new List<Item>();
	public List<string> Properties { get; set; } = new List<string>();
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
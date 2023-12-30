using System.ComponentModel.DataAnnotations;
using MagicPostApi.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Org.BouncyCastle.Asn1.Cms;

namespace MagicPostApi.Models;

public class Order : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required string SenderName { get; set; }
	public required string SenderAddress { get; set; }
	public required float SenderAddressLat { get; set; }
	public required float SenderAddressLong { get; set; }
	public required string SenderProvince { get; set; }
	public required string SenderDistrict { get; set; }
	public required string SenderWard { get; set; }
	[Phone]
	public required string SenderPhone { get; set; }
	public required string ReceiverName { get; set; }
	public required string ReceiverAddress { get; set; }
	public required float ReceiverAddressLat { get; set; }
	public required float ReceiverAddressLong { get; set; }
	public required string ReceiverProvince { get; set; }
	public required string ReceiverDistrict { get; set; }
	public required string ReceiverWard { get; set; }
	[Phone]
	public required string ReceiverPhone { get; set; }
	public IList<Delivery> Deliveries { get; } = new List<Delivery>();
	public List<Item> Items { get; set; } = new List<Item>();
	public required string Properties { get; set; }
	public string? Type { get; set; }
	public int Cod { get; set; }
	public required string Payer { get; set; }
	public string? Note { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public OrderState Status { get; set; } = OrderState.PENDING;
	public Guid? CurrentPointId { get; set; }
	public Point? CurrentPoint { get; set; }
	public PublicOrderInfo GetPublicOrderInfo()
			=> new()
			{
				Id = Id,
				CreatedAt = CreatedAt,
				Status = Status,
				Sender = new()
				{
					Name = SenderName,
					Address = new()
					{
						Name = SenderAddress,
						Lat = SenderAddressLat,
						Long = SenderAddressLong,
						Province = SenderProvince,
						District = SenderDistrict,
						Ward = SenderWard
					},
					Phone = SenderPhone
				},
				Receiver = new()
				{
					Name = ReceiverName,
					Address = new()
					{
						Name = ReceiverAddress,
						Lat = ReceiverAddressLat,
						Long = ReceiverAddressLong,
						Province = ReceiverProvince,
						District = ReceiverDistrict,
						Ward = ReceiverWard
					},
					Phone = ReceiverPhone
				},
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
	public Guid? CurrentPointId { get; set; }
}

public class RejectedOrder : Model
{
	public Guid? OrderId { get; set; }
	public string? Reason { get; set; }
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

public class OrderHistory
{
	public Point? Point { get; set; }
	public DateTime? ArriveAt { get; set; }
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

public class Address
{
	public required string Name { get; set; }
	public required float Lat { get; set; }
	public required float Long { get; set; }
	public required string Province { get; set; }
	public required string District { get; set; }
	public required string Ward { get; set; }
}

public class CustomerProps
{
	public string? Name { get; set; }
	public required Address Address { get; set; }
	public string? Phone { get; set; }
}

public class ForwardOrderModel
{
	[Required]
	public List<Guid>? Orders { get; set; }
	[Required]
	public bool Confirm { get; set; }
	public string? Reason { get; set; }
}

public class UpdateOrderModel : Model
{
	[Required]
	public required CustomerProps Sender { get; set; }
	[Required]
	public required CustomerProps Receiver { get; set; }
	[Required]
	public required PackageInfo PackageInfo { get; set; }
	[Required]
	public required ExtraData ExtraData { get; set; }
	public Guid? CurrentPointId { get; set; }
}

public class ConfirmIncomingOutgoingOrderModel
{
	public List<Guid> Orders { get; set; } = new List<Guid>();
	public bool Confirm { get; set; }
}

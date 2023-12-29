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
	public Delivery()
	{

	}
	public List<DeliveryHistory> GetOperationDeliveryHistory()
	{
		List<DeliveryHistory> history = new List<DeliveryHistory>();
		if (State == DeliveryState.UNSUCCESS)
		{
			history.Add(new DeliveryHistory() { OrderId = OrderId, Point = ToPoint.ToString(), Type = "outgoing", Status = "rejected", Reason = "Your package couldn't reach the target point!", Time = ReceiveTime });
			history.Add(new DeliveryHistory() { OrderId = OrderId, Point = FromPoint.ToString(), Type = "incoming", Status = "rejected", Reason = "Your package couldn't reach the target point!", Time = ReceiveTime });
		}
		else if (State == DeliveryState.ARRIVED)
		{
			history.Add(new DeliveryHistory() { OrderId = OrderId, Point = ToPoint.ToString(), Type = "outgoing", Status = "confirmed", Reason = "", Time = ReceiveTime });
			history.Add(new DeliveryHistory() { OrderId = OrderId, Point = FromPoint.ToString(), Type = "incoming", Status = "confirmed", Reason = "", Time = ReceiveTime });
			history.Add(new DeliveryHistory() { OrderId = OrderId, Point = ToPoint!.ToString(), Type = "outgoing", Status = "pending", Reason = "", Time = ReceiveTime });
		}
		else
		{
			history.Add(new DeliveryHistory() { OrderId = OrderId, Point = ToPoint.ToString(), Type = "outgoing", Status = "confirmed", Reason = "", Time = ReceiveTime });
			history.Add(new DeliveryHistory() { OrderId = OrderId, Point = FromPoint.ToString(), Type = "incoming", Status = "confirmed", Reason = "", Time = ReceiveTime });
		}
		return history;
	}

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

public class DeliveryHistory
{
	public Guid? OrderId { get; set; }
	public string? Type { get; set; }
	public string? Point { get; set; }
	public string? Status { get; set; }
	public string? Reason { get; set; }
	public DateTime? Time { get; set; }
}
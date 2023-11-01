using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MagicPostApi.Models ;
public class Delivery : Model {
    [Key]
    public Guid? Id {get; set;}
    public Guid? SenderId {get; set;}
    public User? Sender {get; set;}
    public Guid? ReceiverId {get; set;}
    public User? Receiver {get; set;}
    
    public Guid? OrderId {get; set;}
    public Order? Order {get; set;}
    public DeliveryState State {get; set;}
    public DateTime? SendTime {get; set;}
    public DateTime? ReceiveTime {get; set;}
}
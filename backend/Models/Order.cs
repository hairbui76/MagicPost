using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace MagicPostApi.Models ;
public class Order : Model {
    [Key]
    public Guid? Id {get; set;}
    public OrderState State {get; set;} 
    public DateTime CreateAt {get; set;} = DateTime.Now;
    public DateTime? CancelAt {get; set;}
    public string Sender {get; set;}
    public string SendAddress {get; set;}
    [Phone]
    public string SenderPhone {get; set;}
    public string Receiver {get; set;}
    public string ReceiveAddress {get; set; }
    [Phone]
    public string ReceiverPhone {get; set;}
    public Guid? Delivery1Id {get; set;}
    public Delivery? Delivery1 {get; set;}
    public Guid? Delivery2Id {get; set;}
    public Delivery? Delivery2 {get; set;}
    public Guid? Delivery3Id {get; set;}
    public Delivery? Delivery3 {get; set;}
    public Guid? Delivery4Id {get; set;}
    public Delivery? Delivery4 {get; set;}
}
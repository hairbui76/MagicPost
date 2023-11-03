using System.ComponentModel.DataAnnotations;

namespace MagicPostApi.Models;

public class Trans_Gather : Model
{
	[Key]
	public Guid Id { get; set; }
	public Guid? TransacionPointId { get; set; }
	public Point? TransactionPoint { get; set; }
	public Guid? GatheringPointId { get; set; }
	public Point? GatheringPoint { get; set; }

}
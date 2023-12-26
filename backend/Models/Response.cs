namespace MagicPostApi.Models;

public class Response<T>
{
	public string? Message { get; set; }
	public T? Data { get; set; }
	public int? PageNumber { get; set; }
	public int? TotalPage { get; set; }
	public Response(string Message, T? Data, int? PageNumber = 0, int? TotalPage = 0)
	{
		this.Message = Message;
		this.Data = Data;
		this.TotalPage = TotalPage;
		this.PageNumber = PageNumber;
	}
	public Response() { }
}
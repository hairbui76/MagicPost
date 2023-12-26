namespace MagicPostApi.Models;

public class Response<T>
{
	public string? Message { get; set; }
	public T? Data { get; set; }
	public Response(string Message, T? Data)
	{
		this.Message = Message;
		this.Data = Data;
	}
	public Response() { }
}
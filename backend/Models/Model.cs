using MagicPostApi.Enums;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

namespace MagicPostApi.Models;

public class Model
{
	public string Repr() => JsonConvert.SerializeObject(this);
}

public class DataPagination<T>
{
	public int DataCount { get; set; }
	public int PageNumber { get; set; }
	public int TotalPage { get; set; }
	public int PageSize { get; set; } = (int)Pagination.PAGESIZE;
	public List<T> Data { get; set; } = new List<T>();
	public DataPagination(List<T> Data, int DataCount, int PageNumber)
	{
		this.Data = Data;
		this.DataCount = DataCount;
		this.PageNumber = PageNumber;
		TotalPage = (int)Math.Ceiling((double)DataCount / PageSize);
		TotalPage = TotalPage == 0 ? 1 : TotalPage;
	}
	public DataPagination(List<T> Data, int DataCount, int PageNumber, int PageSize)
	{
		this.Data = Data;
		this.DataCount = DataCount;
		this.PageNumber = PageNumber;
		TotalPage = (int)Math.Ceiling((double)(DataCount / PageSize));
		TotalPage = TotalPage == 0 ? 1 : TotalPage;
	}
	public DataPagination() { }
}

public static class ModelHelper
{
	public static async Task ForEachAsync<T>(this List<T> list, Func<T, Task> func)
	{
		foreach (var value in list)
		{
			await func(value);
		}
	}
}
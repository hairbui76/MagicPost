using Newtonsoft.Json;

namespace MagicPostApi.Models;

public class Model
{
	public string Repr() => JsonConvert.SerializeObject(this);
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
using Newtonsoft.Json;

namespace MagicPostApi.Models;

public class Model
{
	public string Repr() => JsonConvert.SerializeObject(this);
}
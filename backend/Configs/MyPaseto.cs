using Paseto;
using Paseto.Builder;
using System.Text;

namespace MagicPostApi.Configs;

public class MyPaseto
{
	private readonly Config _config;
	private static PasetoBuilder Builder() => new PasetoBuilder().UseV4(Purpose.Local);
	public MyPaseto(Config config)
	{
		_config = config;
	}
	public string Encode(object payload, string secret)
	{
		if (_config.TOKEN.SECRET == null)
			throw new NullReferenceException("Token secret is required");
		var encryptKey = Encoding.ASCII.GetBytes(secret);
		return Builder().WithKey(encryptKey, Encryption.SymmetricKey).AddClaim("value", payload).Encode();
	}

	public PasetoTokenValidationResult Decode(string token, string secret)
	{
		if (_config.TOKEN.SECRET == null)
			throw new NullReferenceException("Token secret is required");
		var decryptKey = Encoding.ASCII.GetBytes(secret);
		return Builder().WithKey(decryptKey, Encryption.SymmetricKey).Decode(token);
	}
}
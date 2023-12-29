using Isopoh.Cryptography.Argon2;

namespace MagicPostApi.Configs;

public class Password
{
	public const string DEFAULT_PASSWORD = "magicpost";
	public static string Hash(string password) => Argon2.Hash(password);

	public static bool Verify(string hash, string password) => Argon2.Verify(hash, password);
}
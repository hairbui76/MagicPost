namespace MagicPostApi.Configs;

public class Config
{
	public Base BASE = new();
	public Db DB = new();
	public Token TOKEN = new();
	public Redis REDIS = new();
	public string? ENV = Environment.GetEnvironmentVariable("ENV");
}

public class Base
{
	public string PORT;
	public string HOSTNAME;
	public Base()
	{
		PORT = Environment.GetEnvironmentVariable("BASE_PORT") ?? throw new NullReferenceException("BASE_PORT is null");
		HOSTNAME = Environment.GetEnvironmentVariable("BASE_HOST") ?? throw new NullReferenceException("BASE_HOST is null");
	}
}

public class Db
{
	public string URL;
	public string HOST;
	public string DATABASE;
	public string USERNAME;
	public string PASSWORD;
	public Db()
	{
		HOST = Environment.GetEnvironmentVariable("PSQL_HOST") ?? throw new NullReferenceException("PSQL_HOST is null");
		DATABASE = Environment.GetEnvironmentVariable("PSQL_DATABASE") ?? throw new NullReferenceException("PSQL_DATABASE is null");
		USERNAME = Environment.GetEnvironmentVariable("PSQL_USERNAME") ?? throw new NullReferenceException("PSQL_USERNAME is null");
		PASSWORD = Environment.GetEnvironmentVariable("PSQL_PASSWORD") ?? throw new NullReferenceException("PSQL_PASSWORD is null");
		URL = Environment.GetEnvironmentVariable("PSQL_URL") ?? GetConnectionString();
	}
	public string GetConnectionString()
	{
		if (URL != null)
			return URL;
		return string.Format("Host={0}; Database={1}; Username={2}; Password={3}", HOST, DATABASE, USERNAME, PASSWORD);
	}
}

public class Token
{
	public string SECRET;
	public double TOKEN_EXPIRE_HOURS;
	public string REFRESH_SECRET;
	public int REFRESH_TOKEN_EXPIRE_WEEKS;
	public Token()
	{
		SECRET = Environment.GetEnvironmentVariable("TOKEN_SECRET") ?? throw new NullReferenceException("TOKEN_SECRET is null");
		string hours = Environment.GetEnvironmentVariable("TOKEN_EXPIRE_HOURS") ?? throw new NullReferenceException("TOKEN_EXPIRE_HOURS is null");
		TOKEN_EXPIRE_HOURS = double.Parse(hours);
		REFRESH_SECRET = Environment.GetEnvironmentVariable("TOKEN_REFRESH_SECRET") ?? throw new NullReferenceException("TOKEN_REFRESH_SECRET is null");
		string weeks = Environment.GetEnvironmentVariable("REFRESH_TOKEN_EXPIRE_WEEKS") ?? throw new NullReferenceException("REFRESH_TOKEN_EXPIRE_WEEKS is null");
		REFRESH_TOKEN_EXPIRE_WEEKS = int.Parse(weeks);
	}
}

public class Redis
{
	public string URL;
	public string HOST;
	public string PORT;
	public Redis()
	{
		HOST = Environment.GetEnvironmentVariable("REDIS_HOST") ?? throw new NullReferenceException("REDIS_HOST is null");
		PORT = Environment.GetEnvironmentVariable("REDIS_PORT") ?? throw new NullReferenceException("REDIS_PORT is null");
		URL = Environment.GetEnvironmentVariable("REDIS_URL") ?? GetConnectionString();
	}
	public string GetConnectionString()
	{
		if (URL != null)
			return URL;
		return string.Format("{0}:{1}", HOST, PORT);
	}
}
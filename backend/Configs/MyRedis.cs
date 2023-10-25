using StackExchange.Redis;

namespace MagicPostApi.Configs;

public class MyRedis
{
	private readonly Config _config;
	private readonly IConnectionMultiplexer _connectionMultiplexer;
	public MyRedis(Config config)
	{
		_config = config;
		_connectionMultiplexer = ConnectionMultiplexer.Connect(_config.REDIS.URL);
	}
	public IDatabase GetDatabase() => _connectionMultiplexer.GetDatabase();
}
namespace MagicPostApi.Configs;

using MagicPostApi.Models;
using Microsoft.EntityFrameworkCore;

public class WebAPIDataContext : DbContext
{
	private readonly Config _config;
	public WebAPIDataContext(Config config)
	{
		_config = config;
	}
	protected override void OnConfiguring(DbContextOptionsBuilder options)
	{
		// connect to postgres
		options.UseNpgsql(_config.DB.URL);
	}

	public DbSet<User> Users { get; set; }
}
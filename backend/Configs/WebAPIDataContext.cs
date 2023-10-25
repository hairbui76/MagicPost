namespace CSBackend.Configs;

using CSBackend.Models;
using Microsoft.EntityFrameworkCore;

public class WebAPIDataContext : DbContext
{
	protected override void OnConfiguring(DbContextOptionsBuilder options)
	{
		// connect to postgres
		options.UseNpgsql(Config.DB.URL);
	}

	public DbSet<User> Users { get; set; }
}
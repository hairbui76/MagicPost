namespace MagicPostApi.Configs;

using System.Diagnostics;
using MagicPostApi.Models;
using Microsoft.EntityFrameworkCore;

public class WebAPIDataContext : DbContext
{
	private readonly Config _config;
	public WebAPIDataContext(Config config)
	{
		_config = config;
	}
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		// User is staff of a point
		modelBuilder.Entity<User>()
			.HasOne(p => p.Point)
			.WithMany(u => u.Staffs)
			.HasForeignKey(e => e.PointId);

		// Delivery is associated with an order
		modelBuilder.Entity<Delivery>()
			.HasOne(d => d.Order)
			.WithMany(o => o.Deliveries)
			.HasForeignKey(d => d.OrderId);

		// Delivery has been sent from a point
		modelBuilder.Entity<Delivery>()
			.HasOne(d => d.FromPoint)
			.WithMany()
			.HasForeignKey(e => e.FromPointId);

		// Deliver has been sent to a point
		modelBuilder.Entity<Delivery>()
			.HasOne(d => d.ToPoint)
			.WithMany()
			.HasForeignKey(e => e.ToPointId);

		modelBuilder.Entity<Order>()
			.HasMany(o => o.Items)
			.WithOne()
			.HasForeignKey(e => e.OrderId);

		modelBuilder.Entity<Order>()
			.HasOne(o => o.CurrentPoint)
			.WithMany()
			.HasForeignKey(e => e.CurrentPointId);

		modelBuilder.Entity<Trans_Gather>()
			.HasOne(tg => tg.GatheringPoint)
			.WithMany()
			.HasForeignKey(tg => tg.GatheringPointId);

		modelBuilder.Entity<Trans_Gather>()
			.HasOne(tg => tg.TransactionPoint)
			.WithMany()
			.HasForeignKey(tg => tg.TransacionPointId);
	}
	protected override void OnConfiguring(DbContextOptionsBuilder options)
	{
		// connect to postgres
		options.UseNpgsql(_config.DB.URL);
		// Logging
		options.LogTo(Console.WriteLine, LogLevel.Information).EnableSensitiveDataLogging();
	}

	public DbSet<User> Users { get; set; }
	public DbSet<Point> Points { get; set; }
	public DbSet<Trans_Gather> Trans_Gathers { get; set; }
	public DbSet<Order> Orders { get; set; }
	public DbSet<Delivery> Deliveries { get; set; }
	public DbSet<Item> Items { get; set; }
}
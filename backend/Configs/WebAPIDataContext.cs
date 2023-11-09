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
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		// Point can have multiple staffs
		modelBuilder.Entity<Point>()
			.HasMany(p => p.Staffs)
			.WithOne()
			.HasForeignKey(e => e.StaffPointId);

		// Point has only one manager
		modelBuilder.Entity<Point>()
			.HasOne(p => p.Manager)
			.WithOne()
			.HasForeignKey<User>(e => e.ManagerPointId);

		// User is manager of a point
		modelBuilder.Entity<User>()
			.HasOne(p => p.ManagerPoint)
			.WithOne()
			.HasForeignKey<User>(e => e.ManagerPointId);

		// User is staff of a point
		modelBuilder.Entity<User>()
			.HasOne(p => p.StaffPoint)
			.WithOne()
			.HasForeignKey<User>(e => e.StaffPointId);

		// Delivery is associated with an order
		modelBuilder.Entity<Delivery>()
			.HasOne(d => d.Order)
			.WithOne()
			.HasForeignKey<Delivery>(e => e.OrderId);

		// Delivery has been sent from a point
		modelBuilder.Entity<Delivery>()
			.HasOne(d => d.FromPoint)
			.WithOne()
			.HasForeignKey<Delivery>(e => e.FromPointId);

		// Deliver has been sent to a point
		modelBuilder.Entity<Delivery>()
			.HasOne(d => d.ToPoint)
			.WithOne()
			.HasForeignKey<Delivery>(e => e.ToPointId);

		// Order has many deliveries
		modelBuilder.Entity<Order>()
			.HasMany(d => d.Deliveries)
			.WithOne()
			.HasForeignKey(e => e.OrderId);

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
	}

	public DbSet<User> Users { get; set; }
	public DbSet<Point> Points { get; set; }
	public DbSet<Trans_Gather> Trans_Gathers { get; set; }
	public DbSet<Order> Orders { get; set; }
	public DbSet<Delivery> Deliveries { get; set; }
}
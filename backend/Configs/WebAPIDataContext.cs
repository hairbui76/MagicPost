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
		modelBuilder.Entity<Point>()
		.HasMany(p => p.Staffs)
		.WithOne(u => u.Point)
		.HasForeignKey(u => u.PointId);

		modelBuilder.Entity<Point>()
		.HasOne(p => p.Manager)
		.WithOne()
		.HasForeignKey<Point>(p => p.ManagerId);
		
		modelBuilder.Entity<Order>() 
		.HasOne(o => o.Delivery1)
		.WithOne()
		.HasForeignKey<Order>(o => o.Delivery1Id);
		
		modelBuilder.Entity<Order>() 
		.HasOne(o => o.Delivery2)
		.WithOne()
		.HasForeignKey<Order>(o => o.Delivery2Id);
		
		modelBuilder.Entity<Order>() 
		.HasOne(o => o.Delivery3)
		.WithOne()
		.HasForeignKey<Order>(o => o.Delivery3Id);
		
		modelBuilder.Entity<Order>() 
		.HasOne(o => o.Delivery4)
		.WithOne()
		.HasForeignKey<Order>(o => o.Delivery4Id);
		
		modelBuilder.Entity<Order>() 
		.HasOne(o => o.Delivery4)
		.WithOne()
		.HasForeignKey<Order>(o => o.Delivery4Id);

		modelBuilder.Entity<Delivery>() 
		.HasOne(d => d.Sender)
		.WithMany()
		.HasForeignKey(d => d.SenderId);

		modelBuilder.Entity<Delivery>() 
		.HasOne(d => d.Receiver)
		.WithMany()
		.HasForeignKey(d => d.ReceiverId);

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
	public DbSet<Point> Points {get; set;}
	public DbSet<Trans_Gather> Trans_Gathers {get; set;}
	public DbSet<Order> Orders {get; set;}
	public DbSet<Delivery> Deliveries {get; set;}
}
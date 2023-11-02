using MagicPostApi.Services;
using MagicPostApi.Configs;
using MagicPostApi.Middlewares;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

// Load environments from .env file
DotNetEnv.Env.Load();
// Create builder
var builder = WebApplication.CreateBuilder(args);
{
	// Serialize JSON response
	// Set PropertyNamingPolicy to null for remaining properties naming policy
	// Can be set to CamelCase instead of null
	builder.Services.AddControllers()
			.AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddSwaggerGen();
	// Dependency injection
	// Add global configurations
	builder.Services.AddSingleton<Config>();
	// Add paseto encoding support
	builder.Services.AddSingleton<MyPaseto>();
	// Add postgresql db context
	builder.Services.AddDbContext<WebAPIDataContext>();
	// Add redis
	builder.Services.AddSingleton<MyRedis>();
	// Add data protection
	builder.Services.AddDataProtection();
	// Add auto mapper support for model
	builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
	// Add services
	builder.Services.AddScoped<IUserService, UserService>();
	builder.Services.AddScoped<IPointService, PointService>();
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
	var scope = app.Services.CreateScope();
	// Get db context for development initialization
	var db = scope.ServiceProvider.GetRequiredService<WebAPIDataContext>();
	// Delete database
	db.Database.EnsureDeleted();
	// Create database again to sync schemas update
	db.Database.EnsureCreated();
}

{
	// HTTP logging
	app.UseHttpLogging();

	// HTTPS support
	app.UseHttpsRedirection();

	// Add route maching to middleware pipeline
	// Ensure that middlewares can access route data
	app.UseRouting();

	// Initial Hello GET request
	app.MapGet("/", () => "Hello, world!");

	// Prefix all request with /api
	app.UsePathBase(new PathString("/api"));

	// Use global error handler middleware
	app.UseMiddleware<ErrorHandlerMiddleware>();

	// Auto map routes defined in Controllers folder
	app.MapControllers();
}

app.Run();
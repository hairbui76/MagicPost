using MagicPostApi.Services;
using MagicPostApi.Configs;
using MagicPostApi.Middlewares;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json.Converters;

// Load environments from .env file
DotNetEnv.Env.Load();
// Create builder
var builder = WebApplication.CreateBuilder(args);
{
	builder.Services.AddControllers()
			// Serialize JSON response
			// Set PropertyNamingPolicy to null for remaining properties naming policy
			// Can be set to CamelCase instead of null
			.AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null)
			.AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
			// Response json serialization always lowercase the first character
			.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver())
			// Serialize enum
			// ! Don't know why JsonStringEnumConverter doesn't work, prefer NewtonsoftJson
			.AddNewtonsoftJson(options => options.SerializerSettings.Converters.Add(new StringEnumConverter()));
	// Add custom Validation error handler for Models
	builder.Services.Configure<ApiBehaviorOptions>(o =>
			{
				o.InvalidModelStateResponseFactory = (actionContext)
			=>
				{
					var message = string.Join(" | ", actionContext.ModelState.Values
															.SelectMany(v => v.Errors)
															.Select(e => e.ErrorMessage));
					return new BadRequestObjectResult(new { message });
				};
			});
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
	// Add auto mapper support for model
	builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
	// Add services
	builder.Services.AddScoped<IUserService, UserService>();
	builder.Services.AddScoped<IPointService, PointService>();
	builder.Services.AddScoped<IOrderService, OrderService>();
	builder.Services.AddScoped<IDeliveryService, DeliveryServce>();
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
	// db.Database.EnsureDeleted();
	// Create database again to sync schemas update
	db.Database.EnsureCreated();
}

{
	app.UseCors(x => x
			.WithOrigins("http://localhost:3000")
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials());

	// HTTP logging
	// app.UseHttpLogging();

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
using MagicPostApi.Services;
using MagicPostApi.Configs;
using MagicPostApi.Middlewares;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.HttpLogging;

// Load environments from .env file
DotNetEnv.Env.Load();
// Create builder
var builder = WebApplication.CreateBuilder(args);
// Serialize JSON response
// Set PropertyNamingPolicy to null for remaining properties naming policy
// Can be set to CamelCase instead of null
builder.Services.AddControllers()
		.AddJsonOptions(
				options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
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
// Add user services
builder.Services.AddScoped<UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
	var scope = app.Services.CreateScope();
	var db = scope.ServiceProvider.GetRequiredService<WebAPIDataContext>();
	db.Database.EnsureCreated();
}

app.UseHttpLogging();

app.UseHttpsRedirection();

app.UseRouting();

app.MapGet("/", () => "Hello, world!");

app.UsePathBase(new PathString("/api"));

app.UseWhen(context => context.Request.Path == "/auth", appBuilder =>
{
	appBuilder.UseMiddleware<VerifyToken>();
});

app.MapControllers();

app.Run();
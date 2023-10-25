using MagicPostApi.Services;
using MagicPostApi.Configs;
using MagicPostApi.Middlewares;
using StackExchange.Redis;

// Load ENV
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
// Add postgresql db context
builder.Services.AddDbContext<WebAPIDataContext>();
// Add redis
builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect("localhost"));
builder.Services.AddHttpClient();
// Add user services
builder.Services.AddScoped<UserService>();
builder.Services.AddDataProtection();

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
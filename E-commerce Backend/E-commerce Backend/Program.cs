using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Enable CORS for local development so frontend apps can call the API.
// For production tighten this to specific origins.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowDev", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register DbContext - AppDBContext has an OnConfiguring fallback so we can
// register without a connection string here. If you prefer appsettings, add
// a DefaultConnection string and switch to UseSqlServer with configuration.
builder.Services.AddDbContext<AppDBContext>();

// Add Swagger/OpenAPI support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "E-commerce API", Version = "v1" });
});

// Configure Kestrel to listen on port 5000
builder.WebHost.UseUrls("http://localhost:5000");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS policy - Must be before Authorization and MapControllers
app.UseCors("AllowDev");

// HTTPS redirection intentionally disabled for now to avoid local redirect warnings
// (enable when HTTPS is configured / when running in Development with proper certs)

app.UseAuthorization();

app.MapControllers();

app.Run();
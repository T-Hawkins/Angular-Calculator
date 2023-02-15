using Calculator.DataAccess;
using Calculator.Models.Configuration;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Configuration
    .AddJsonFile("appsettings.json")
#if DEBUG
    .AddJsonFile("appsettings.Development.json")
#endif
    .Build();

var config = builder.Configuration;
// Add services to the container.
builder.Services.Configure<CalculatorDataAccessOptions>(config.GetSection(nameof(CalculatorDataAccessOptions)));
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<CalculatorDataAccessor>();

WebApplication app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
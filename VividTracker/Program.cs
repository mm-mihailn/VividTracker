using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using VividTracker.Business.Services.Interfaces;
using VividTracker.Business.Services;
using VividTracker.Data;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;
using VividTracker.Data.Repositories;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCredentialsPolicy",
        policy =>
        {
            policy.WithOrigins("https://localhost:7091")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .WithMethods("PUT", "DELETE", "GET", "PATCH", "POST")
                                    .AllowCredentials();
        });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<User, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddScoped<ITenantsRepository, TenantsRepository>();
builder.Services.AddScoped<ITenantsService, TenantsService>();

builder.Services.AddScoped<ITrackingGroupsRepository, TrackingGroupsRepository>();
builder.Services.AddScoped<ITrackingGroupsService, TrackingGroupsService>();

builder.Services.AddScoped<ITrackingGroupRecordsRepository, TrackingGroupRecordsRepository>();
builder.Services.AddScoped<ITrackingGroupRecordsService, TrackingGroupRecordService>();

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IUsersService, UsersService>();

builder.Services.AddScoped<ITrackingItemsRepository, TrackingItemsRepository>();
builder.Services.AddScoped<ITrackingItemsService, TrackingItemsService>();

builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html"); ;

app.UseCors("AllowCredentialsPolicy");

app.Run();

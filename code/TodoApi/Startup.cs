using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Contexts;
using Utilities;
using Managers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


namespace TodoApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }
    readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      string mySqlConnectionStr = Configuration.GetConnectionString("DefaultConnection");
      services.AddDbContext<TodoContext>(options => options.UseMySQL(mySqlConnectionStr));
      services.AddCors(options =>
      {
        options.AddPolicy(name: "_myAllowSpecificOrigins",
                            builder =>
                            {
                              builder.WithOrigins("http://localhost:3000",
                                "http://localhost:5000/")
                                .AllowAnyHeader()
                                .AllowAnyMethod(); ;
                            });
      });
      services.Configure<AppSettingsSection>(Configuration.GetSection("AppSettings"));

      services.AddScoped<UsersManager, UsersManager>();
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuer = false,
          ValidateAudience = false,
          ValidateLifetime = false,
          ValidateIssuerSigningKey = true,
          ValidIssuer = Configuration["AppSettings:Issuer"],
          ValidAudience = Configuration["AppSettings:Issuer"],
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["AppSettings:Secret"]))
        };
      });

      services.AddControllers();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();

      app.UseRouting();
      app.UseCors("_myAllowSpecificOrigins");

      app.UseAuthentication();
      app.UseAuthorization();

      // custom jwt auth middleware
      // app.UseMiddleware<JwtMiddleware>();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}

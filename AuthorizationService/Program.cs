using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using System.Security.Cryptography.X509Certificates;
using AuthorizationServer.Data;

namespace AuthorizationServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddHostedService<TestData>();


            
            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                             {
                                  options.LoginPath = "/account/login";
                             });


            // Obtiene la cadena de conexión desde el archivo de configuración
            var connectionString = builder.Configuration.GetConnectionString("UsersContextConnection")
                              ?? throw new InvalidOperationException("Connection string 'UsersContextConnection' not found.");

            // Configurar el contexto de base de datos para los usuarios
            builder.Services.AddDbContext<UsersDbContext>(
                options => options.UseSqlServer(connectionString)
            );

            // Configurar OpenIddict con Entity Framework Core
            //builder.Services.AddDbContext<DbContext>(
            //    options =>
            //    {
            //        // Configurar el contexto para usar SQL Server
            //        //options.UseSqlServer(connectionString);

            //        options.UseInMemoryDatabase(nameof(DbContext));

            //        // Registrar los modelos de OpenIddict
            //        options.UseOpenIddict();
            //    }
            //);

            builder.Services.AddDbContext<DbContext>(options =>
            {
                // Configure the context to use an in-memory store.
                options.UseInMemoryDatabase(nameof(DbContext));

                // Register the entity sets needed by OpenIddict.
                options.UseOpenIddict();
            });

            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy(
            //        name: "MyCorsPolicy",
            //        policy =>
            //        {
            //            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            //        }
            //    );
            //});

            builder.Services.AddControllersWithViews();

            builder.Services.AddOpenIddict()

                    // Register the OpenIddict core components.
                    .AddCore(options =>
                    {
                        // Configure OpenIddict to use the EF Core stores/models.
                        options.UseEntityFrameworkCore()
                            .UseDbContext<DbContext>();
                    })
            
                    // Register the OpenIddict server components.
                    .AddServer(options =>
                    {
                        options
                            .AllowAuthorizationCodeFlow()
                            .RequireProofKeyForCodeExchange();

                        options
                            .AllowClientCredentialsFlow();

                        options
                            .AllowImplicitFlow();

                        options
                            .SetAuthorizationEndpointUris("/connect/authorize")
                            .SetTokenEndpointUris("/connect/token")
                            .SetUserinfoEndpointUris("/connect/userinfo");


                        // Register scopes (permissions)
                        options.RegisterScopes("api");

                        // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
                        options
                            .UseAspNetCore()
                            .EnableTokenEndpointPassthrough()
                            .EnableAuthorizationEndpointPassthrough()
                            .EnableUserinfoEndpointPassthrough();

                        options.UseAspNetCore().DisableTransportSecurityRequirement();

                        options
                               .AddEphemeralEncryptionKey()
                               .AddEphemeralSigningKey()
                               .DisableAccessTokenEncryption();



                    });


            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());

            app.UseAuthentication();

            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });

            app.MapControllers();
            app.Run();
        }
    }
}

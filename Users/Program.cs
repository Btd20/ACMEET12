using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Users.Models;
using Users.Services;

var builder = WebApplication.CreateBuilder(args);

//Conexión a la base de datos
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetSection("ConnectionStrings:DefaultConnection").Value);
});

//Configuración del identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    // Configuración del password
}).AddEntityFrameworkStores<ApplicationDbContext>()
    .AddRoles<IdentityRole>()
    .AddRoleManager<RoleManager<IdentityRole>>()
    .AddDefaultTokenProviders();

builder.Services.AddTransient<IAuthService, AuthService>();

builder.Services.AddIdentityCore<IdentityUser>()
    .AddUserManager<UserManager<IdentityUser>>();




//Configuración del token
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        RequireExpirationTime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Value,
        ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Value,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:Key").Value))
    };
});



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    //Titulo del diseño
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Users", Version = "v1" });

    //Botoón autorize de swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt Authorization",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();


// Agrega la configuración de CORS aquí
app.UseCors(options =>
{
    options.WithOrigins("http://localhost:4200");
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});


app.MapControllers();

app.MapControllers();
//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;
//    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
//    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

//    var Name = "Administrador";
//    // comprueba si existe
//    if (!await roleManager.RoleExistsAsync(Name))
//    {
//        var role = new IdentityRole(Name);
//        await roleManager.CreateAsync(role);
//    }

//    //correo de administrador super adm
//    var usuario = await userManager.FindByEmailAsync("adm@acme.com");


//    if (usuario != null)
//    {
//        var isInRole = await userManager.IsInRoleAsync(usuario, Name);

//        if (!isInRole)
//        {
//            await userManager.AddToRoleAsync(usuario, Name);
//        }
//    }
//}

app.Run();

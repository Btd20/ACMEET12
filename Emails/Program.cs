var builder = WebApplication.CreateBuilder(args);

var emailKey = builder.Configuration["EMailKey"];

var emailConfig = builder.Configuration
    .GetSection("EmailConfiguration")
    .Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);

builder.Services.AddScoped<EmailService>();

builder.Services.AddControllers();

var app = builder.Build();

app.Run();

using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Load OpenAI API key from config
var openAiKey = builder.Configuration["OpenAI:ApiKey"];
if (string.IsNullOrWhiteSpace(openAiKey) || openAiKey == "dummy")
{
    throw new Exception("OpenAI API key is missing or invalid.");
}

// Configure OpenAI client
builder.Services.AddHttpClient("OpenAIClient", client =>
{
    client.BaseAddress = new Uri("https://api.openai.com/");
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", openAiKey);
});

// Allow CORS for React (Vite) dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();

// Enable Swagger middleware in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply CORS
app.UseCors("AllowViteFrontend");

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
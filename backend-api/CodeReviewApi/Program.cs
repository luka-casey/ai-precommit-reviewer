using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

var openAiKey = builder.Configuration["OpenAI:ApiKey"];
if (string.IsNullOrWhiteSpace(openAiKey) || openAiKey == "dummy")
{
    throw new Exception("OpenAI API key is missing or invalid.");
}

builder.Services.AddHttpClient("OpenAIClient", client =>
{
    client.BaseAddress = new Uri("https://api.openai.com/");
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", openAiKey);
});

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();


app.Run();
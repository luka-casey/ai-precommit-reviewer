using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CodeReviewController : ControllerBase
{
    private readonly HttpClient _openAiClient;

    public CodeReviewController(IHttpClientFactory httpClientFactory)
    {
        _openAiClient = httpClientFactory.CreateClient("OpenAIClient");
    }

    [HttpPost]
    public async Task<IActionResult> Review([FromBody] CodeReviewRequest request)
    {
        var prompt = $"Review this code and suggest improvements:\n\n{request.Code}";

        var body = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "user", content = prompt }
            }
        };

        var response = await _openAiClient.PostAsJsonAsync("v1/chat/completions", body);
        var json = await response.Content.ReadAsStringAsync();

        return Ok(JsonDocument.Parse(json));
    }
}

public class CodeReviewRequest
{
    public string? Code { get; set; }
}
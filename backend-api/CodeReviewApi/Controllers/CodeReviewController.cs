using System.Runtime.InteropServices.JavaScript;
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
        var prompt = $"You are an Ai code-reviewer, responsible for initially reviewing code " +
                     $"prior to a human code review. Please review the following code. " +
                     $"Avoid suggesting inconsequential changes and keep responses short where there is not anything to change :\n\n{request.Code}";
        
        var body = new
        {
            model = GptApiUtilities.ValidateModel(request.GptModel), 
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
    public string GptModel { get; set; }
}
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
    public async Task<IActionResult> Review([FromBody] CodeReviewApi.Models.CodeReviewRequest request)
    {
        string prompt;
        if (String.IsNullOrEmpty(request.Comment))
        {
            prompt = $"Please review the following code. Avoid suggesting inconsequential changes and keep responses short where there is not anything to change :\n\n{request.Code}";
        }
        else
        {
            prompt = $"{request.Comment} :\n\n{request.Code}";
        }
        
        var body = new
        {
            model = CodeReviewApi.Services.OpenAiApiService.ValidateModel(request.GptModel), 
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
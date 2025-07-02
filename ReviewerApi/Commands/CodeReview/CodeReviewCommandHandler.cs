using System.Text.Json;
using CodeReviewApi.Services;

namespace CodeReviewApi.Commands.CodeReview;
public class CodeReviewCommandHandler
{
    private readonly HttpClient _openAiClient;
    public CodeReviewCommandHandler(IHttpClientFactory factory)
    {
        _openAiClient = factory.CreateClient("OpenAIClient");
    }

    public async Task<JsonDocument> Handle(CodeReviewCommand command)
    {
        var request = command.Request;

        string prompt = string.IsNullOrEmpty(request.Comment)
            ? $"Please review the following code. Avoid suggesting inconsequential changes and keep responses short where there is not anything to change :\n\n{request.Code}"
            : $"{request.Comment} :\n\n{request.Code}";

        var body = new
        {
            model = OpenAiApiService.ValidateModel(request.GptModel),
            messages = new[] { new { role = "user", content = prompt } }
        };

        var response = await _openAiClient.PostAsJsonAsync("v1/chat/completions", body);
        var json = await response.Content.ReadAsStringAsync();

        return JsonDocument.Parse(json);
    }
}

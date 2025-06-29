namespace CodeReviewApi.Models;

public class CodeReviewRequest
{
    public string? Code { get; set; }
    public string? GptModel { get; set; }
    public string? Comment { get; set; }    
}
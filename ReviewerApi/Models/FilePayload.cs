namespace CodeReviewApi.Models;

public class FilePayload
{
    public FilePayload(string body, string? beforeFileName, string? afterFileName)
    {
        Body = body;
        BeforeFileName = beforeFileName;
        AfterFileName = afterFileName;
    }
    
    public string Body { get; }
    public string? BeforeFileName { get; }
    public string? AfterFileName { get; }
    
}
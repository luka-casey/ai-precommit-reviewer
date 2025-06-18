namespace CodeReviewApi;

public class FilePayload
{
    public FilePayload(string body, string fileName)
    {
        Body = body;
        FileName = fileName;
    }
    
    public string Body { get; }
    public string FileName { get; }
    
}
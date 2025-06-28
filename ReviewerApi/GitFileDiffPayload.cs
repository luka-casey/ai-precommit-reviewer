namespace CodeReviewApi;

public class GitCommitFilePayload
{
    public GitCommitFilePayload(FilePayload inlineDiff, FilePayload beforeContent, FilePayload afterContent)
    {
        InlineDiff = inlineDiff;
        BeforeContent = beforeContent;
        AfterContent = afterContent;
    }
    
    public FilePayload InlineDiff { get; }
    public FilePayload BeforeContent { get; }
    public FilePayload AfterContent { get; }
}

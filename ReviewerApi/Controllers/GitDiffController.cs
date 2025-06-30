using Microsoft.AspNetCore.Mvc;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class GitDiffController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDiff()
    {
        string gitStagedDiffFile = CodeReviewApi.Services.GitDiffUtilities.CreateGitStagedDiffFile();
        List<CodeReviewApi.Models.GitCommitFilePayload> gitDiffCollectionPayload = CodeReviewApi.Services.GitDiffUtilities.CreateGitDiffCollectionPayload(gitStagedDiffFile);
        
        return Ok(gitDiffCollectionPayload); 
    }
}
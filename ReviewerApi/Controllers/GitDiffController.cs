using Microsoft.AspNetCore.Mvc;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class GitDiffController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDiff()
    {
        // Create git Staged Diff file
        string gitStagedDiffFile = CodeReviewApi.Services.GitDiffUtilities.CreateGitStagedDiffFile();
        
        if (!System.IO.File.Exists(gitStagedDiffFile))
            return NotFound($"The gitStagedDiffFile was not found at location {gitStagedDiffFile}");

        try
        {
            List<CodeReviewApi.Models.GitCommitFilePayload> gitDiffCollectionPayload = CodeReviewApi.Services.GitDiffUtilities.CreateGitDiffCollectionPayload(gitStagedDiffFile);
            return Ok(gitDiffCollectionPayload); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error when attempting to create diff payload: {ex.Message}");
        }
    }
}
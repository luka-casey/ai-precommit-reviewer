using Microsoft.AspNetCore.Mvc;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class GitDiffController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDiff()
    {
        // Update git Staged Diff file
        GitDiffUtilities.WriteStagedDiffToFile();
        
        const string gitStagedDiffFile = "/tmp/git_staged_diff.txt";
        
        if (!System.IO.File.Exists(gitStagedDiffFile))
            return NotFound($"The gitStagedDiffFile was not found at location {gitStagedDiffFile}");

        try
        {
            List<GitCommitFilePayload> gitDiffCollectionPayload = GitDiffUtilities.CreateGitDiffCollectionPayload(gitStagedDiffFile);

            return Ok(gitDiffCollectionPayload); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error when attempting to create diff payload: {ex.Message}");
        }
    }
}
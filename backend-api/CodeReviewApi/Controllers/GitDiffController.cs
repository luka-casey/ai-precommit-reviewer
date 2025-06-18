using Microsoft.AspNetCore.Mvc;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class GitDiffController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDiff()
    {
        var tempFile = "/tmp/git_staged_diff.txt";
        if (!System.IO.File.Exists(tempFile))
            return NotFound("No diff available.");

        // This returns the cleaned content as string, not a file path
        var cleanedContent = GitDiffUtilities.StripGitDiffMetadata(tempFile);

        // You already have the content, no need to read the file again
        return Ok(new { diff = cleanedContent });
    }
}
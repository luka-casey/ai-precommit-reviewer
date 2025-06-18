using Microsoft.AspNetCore.Mvc;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class GitDiffController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDiff()
    {
        GitDiffUtilities.WriteStagedDiffToFile();
        
        const string gitStagedDiffFile = "/tmp/git_staged_diff.txt";

        if (!System.IO.File.Exists(gitStagedDiffFile))
            return NotFound("No diff available.");

        try
        {
            //Extract gitStagedDiffFile into a string []
            string fullDiffContent = System.IO.File.ReadAllText(gitStagedDiffFile);
            string[] files = GitDiffUtilities.ExtractMultipleFiles(fullDiffContent);
            
            List<GitCommitFilePayload> payloadBundle = new List<GitCommitFilePayload>();
            // Add to Accumilative Class
            foreach (string file in files)
            {
                // create Inline,
                string inlineFileName = GitDiffUtilities.ExtractFileNameFromDiff(file, isBefore: false);
                string inlineFile = GitDiffUtilities.StripGitDiffMetadata(file);
                FilePayload inlineFileObject = new FilePayload(inlineFile, inlineFileName);

                // create Before, 
                string beforeContent = GitDiffUtilities.ExtractBeforeAfterContent(file, isBefore: true);
                string beforeFileName = GitDiffUtilities.ExtractFileNameFromDiff(file, isBefore: true);
                FilePayload beforeFileObject = new FilePayload(beforeContent, beforeFileName);

                // create After, 
                string afterContent = GitDiffUtilities.ExtractBeforeAfterContent(file, isBefore: false);
                string afterFileName = GitDiffUtilities.ExtractFileNameFromDiff(file, isBefore: false);
                FilePayload afterFileObject = new FilePayload(afterContent, afterFileName);

                
                // create bundle payload object for single File Change
                var gitCommitFilePayload = new GitCommitFilePayload(
                    inlineDiff: inlineFileObject,
                    beforeContent: beforeFileObject,
                    afterContent: afterFileObject
                );

                payloadBundle.Add(gitCommitFilePayload);
            }

            return Ok(payloadBundle); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"test: {ex.Message}");
        }
    }
}
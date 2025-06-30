using System.Text;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace CodeReviewApi.Services;

public class GitDiffUtilities
{
    public static List<CodeReviewApi.Models.GitCommitFilePayload> CreateGitDiffCollectionPayload(string gitStagedDiffFile)
    {
        try
        {
            //Extract gitStagedDiffFile into a String
            string fullDiffContent = System.IO.File.ReadAllText(gitStagedDiffFile);
            
            //Split into a string[] seperated by files changed
            string[] files = GitDiffUtilities.ExtractMultipleFiles(fullDiffContent);
            
            List<CodeReviewApi.Models.GitCommitFilePayload> gitDiffCollectionPayload = new List<CodeReviewApi.Models.GitCommitFilePayload>();
            
            foreach (string file in files)
            {
                // create Before, 
                string beforeContent = GitDiffUtilities.ExtractBeforeAfterContent(file, isBefore: true);
                string beforeFileName = GitDiffUtilities.ExtractFileNameFromDiff(file, isBefore: true);
                CodeReviewApi.Models.FilePayload beforeFileObject = new CodeReviewApi.Models.FilePayload(beforeContent, beforeFileName, null);

                // create After, 
                string afterContent = GitDiffUtilities.ExtractBeforeAfterContent(file, isBefore: false);
                string afterFileName = GitDiffUtilities.ExtractFileNameFromDiff(file, isBefore: false);
                CodeReviewApi.Models.FilePayload afterFileObject = new CodeReviewApi.Models.FilePayload(afterContent, null, afterFileName);
                
                // create Inline,
                string inlineFile = GitDiffUtilities.ExtractInlineContent(file);
                CodeReviewApi.Models.FilePayload inlineFileObject = new CodeReviewApi.Models.FilePayload(inlineFile, beforeFileName, afterFileName);

                // create gitCommitFilePayload object 
                var gitCommitFilePayload = new CodeReviewApi.Models.GitCommitFilePayload(
                    inlineDiff: inlineFileObject,
                    beforeContent: beforeFileObject,
                    afterContent: afterFileObject
                );

                gitDiffCollectionPayload.Add(gitCommitFilePayload);
            }
        
            return gitDiffCollectionPayload;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
    }
    
    private static string ExtractInlineContent(string diffContent)
    {
        var sb = new StringBuilder();
        using var reader = new StringReader(diffContent);

        string? line;
        while ((line = reader.ReadLine()) != null)
        {
            if (string.IsNullOrWhiteSpace(line))
                continue;

            // Skip metadata lines
            if (line.StartsWith("diff --git") ||
                line.StartsWith("index ") ||
                line.StartsWith("@@") ||
                line.StartsWith("\\ No newline") ||
                line.StartsWith("--- ") ||  // 👈 now stripping
                line.StartsWith("+++ "))    // 👈 now stripping
            {
                continue;
            }

            // Keep only code lines
            if (line.StartsWith(" ") || line.StartsWith("+") || line.StartsWith("-"))
            {
                sb.AppendLine(line);
            }
        }

        return sb.ToString();
    }

    private static string ExtractBeforeAfterContent(string diff, bool isBefore)
    {
        var sb = new StringBuilder();
        var lines = diff.Split(new[] { '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);

        foreach (var rawLine in lines)
        {
            var line = rawLine.TrimEnd('\r');

            if (line.StartsWith("--- ") || line.StartsWith("+++ "))
            {
                // Skip file metadata lines
                continue;
            }

            if (isBefore)
            {
                // For "before" content: include lines starting with '-' or ' '
                if (line.StartsWith("-"))
                {
                    sb.AppendLine(line.Substring(1));
                }
                else if (line.StartsWith(" "))
                {
                    sb.AppendLine(line.Substring(1));
                }
            }
            else
            {
                // For "after" content: include lines starting with '+' or ' '
                if (line.StartsWith("+"))
                {
                    sb.AppendLine(line.Substring(1));
                }
                else if (line.StartsWith(" "))
                {
                    sb.AppendLine(line.Substring(1));
                }
            }
        }

        return sb.ToString();
    }
    
    private static string ExtractFileNameFromDiff(string diff, bool isBefore)
    {
        var lines = diff.Split(new[] { '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);

        foreach (var line in lines)
        {
            if (isBefore && line.StartsWith("--- "))
                return line.Substring(4).Trim().Replace("a/", "");

            if (!isBefore && line.StartsWith("+++ "))
                return line.Substring(4).Trim().Replace("b/", "");
        }

        return "unknown";
    }
    
    /// <summary>
    /// Runs 'git diff --cached > /tmp/git_staged_diff.txt'
    /// This command is what updates the 'git_staged_diff' file based on your staged changes
    /// </summary>
    public static string CreateGitStagedDiffFile(string? outputPath = null)
    {
        // Detect OS and set default output path
        if (string.IsNullOrEmpty(outputPath))
        {
            string fileName = "git_staged_diff.txt";
            
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                outputPath = Path.Combine(Path.GetTempPath(), fileName);
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux) || RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                outputPath = $"/tmp/{fileName}";
            }
            else
            {
                throw new PlatformNotSupportedException("Unsupported OS platform");
            }
        }

        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "git",
                Arguments = "diff --cached",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        process.Start();
        string output = process.StandardOutput.ReadToEnd();
        process.WaitForExit();
        File.WriteAllText(outputPath, output);

        if (!System.IO.File.Exists(outputPath))
            throw new System.Exception($"The gitStagedDiffFile was not found at location {outputPath}");
        
        return outputPath;
    }

    
    /// <summary>
    /// Turns your git_staged_diff.txt into a string[] seperated by code file change
    /// </summary>
    private static string[] ExtractMultipleFiles(string fullDiffContent)
    {
        try
        {
            var parts = fullDiffContent.Split(new[] { "diff --git " }, StringSplitOptions.RemoveEmptyEntries);

            return parts
                .Select(part => "diff --git " + part.Trim())
                .ToArray();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }


}
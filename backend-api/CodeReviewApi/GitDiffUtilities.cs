using System.Text;
using System.Diagnostics;
using System.IO;

namespace CodeReviewApi;

public class GitDiffUtilities
{
    public static string StripGitDiffMetadata(string diffContent)
    {
        var sb = new StringBuilder();

        using var reader = new StringReader(diffContent);

        string? line;
        while ((line = reader.ReadLine()) != null)
        {
            if (string.IsNullOrWhiteSpace(line))
                continue;

            if (line.StartsWith("--- ") || line.StartsWith("+++ "))
            {
                sb.AppendLine(line);
                continue;
            }

            if (line.StartsWith("diff --git") ||
                line.StartsWith("index ") ||
                line.StartsWith("@@") ||
                line.StartsWith("\\ No newline"))
            {
                continue;
            }

            if (line.StartsWith(" ") || line.StartsWith("+") || line.StartsWith("-"))
            {
                sb.AppendLine(line);
            }
        }

        return sb.ToString();
    }

    
    public static string ExtractBeforeAfterContent(string diff, bool isBefore)
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
    
    public static string ExtractFileNameFromDiff(string diff, bool isBefore)
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
    public static void WriteStagedDiffToFile(string outputPath = "/tmp/git_staged_diff.txt")
    {
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
    }
    
    public static string[] ExtractMultipleFiles(string fullDiffContent)
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
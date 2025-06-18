using System.Text;

namespace CodeReviewApi;

public class GitDiffUtilities
{
    public static string StripGitDiffMetadata(string diffFilePath)
    {
        if (!File.Exists(diffFilePath))
            throw new FileNotFoundException("Diff file not found", diffFilePath);

        var sb = new StringBuilder();

        foreach (var line in File.ReadLines(diffFilePath))
        {
            if (string.IsNullOrWhiteSpace(line))
                continue;

            // Keep file name lines (start with --- or +++)
            if (line.StartsWith("--- ") || line.StartsWith("+++ "))
            {
                sb.AppendLine(line);
                continue;
            }

            // Skip other diff metadata lines
            if (line.StartsWith("diff --git") ||
                line.StartsWith("index ") ||
                line.StartsWith("new file mode") ||
                line.StartsWith("@@ ") ||
                line.StartsWith("\\ No newline"))
            {
                continue;
            }

            // Only include added lines (strip leading '+')
            if (line.StartsWith("+"))
            {
                sb.AppendLine(line.Substring(1));
            }
        }

        return sb.ToString();
    }

}
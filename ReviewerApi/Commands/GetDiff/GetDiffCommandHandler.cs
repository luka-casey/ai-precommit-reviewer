using CodeReviewApi.Models;
using CodeReviewApi.Services;

namespace CodeReviewApi.Commands.GetDiff;
public class GitDiffCommandHandler
{
    public List<GitCommitFilePayload> Handle(GitDiffCommand command)
    {
        string gitStagedDiffFile = GitDiffUtilities.CreateGitStagedDiffFile();
        List<GitCommitFilePayload> gitDiffCollectionPayload = GitDiffUtilities.CreateGitDiffCollectionPayload(gitStagedDiffFile);

        return gitDiffCollectionPayload;
    }
}

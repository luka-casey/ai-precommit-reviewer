using CodeReviewApi.Models;

namespace CodeReviewApi.Commands.CodeReview;
public class CodeReviewCommand
{
    public CodeReviewRequest Request { get; }

    public CodeReviewCommand(CodeReviewRequest request)
    {
        Request = request;
    }
}

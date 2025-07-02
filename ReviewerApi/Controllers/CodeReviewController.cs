using Microsoft.AspNetCore.Mvc;
using CodeReviewApi.Models;
using CodeReviewApi.Commands.CodeReview;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CodeReviewController : ControllerBase
{
    private readonly CodeReviewCommandHandler _handler;

    public CodeReviewController(CodeReviewCommandHandler handler)
    {
        _handler = handler;
    }

    [HttpPost]
    public async Task<IActionResult> Review([FromBody] CodeReviewRequest request)
    {
        return Ok(await _handler.Handle(new CodeReviewCommand(request)));
    }
}
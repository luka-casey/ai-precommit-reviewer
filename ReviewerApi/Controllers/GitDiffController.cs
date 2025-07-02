using CodeReviewApi.Commands.GetDiff;
using Microsoft.AspNetCore.Mvc;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class GitDiffController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDiff() => Ok(new GitDiffCommandHandler().Handle(new GitDiffCommand()));
}

Setup Guide:

1) **Create API key**
- Sign up and create an OpenAI API at https://platform.openai.com/api-keys
- Enter your API key in ai-precommmit-reviewer/backend-api/CodeReviewApi/appsettings.json


2) **Configure pre-commit hook** (optional)
*This creates a commandline hook that opens the app prior to a git commit.
This is optional and has problems working in IDE's where the terminal may be read only.
Recommended to be used in a non-inbuild terminal like iterm2*

- Navigate to ai-precommmit-reviewer/.git/hooks/pre-commit
- Insert the following script

```
#!/bin/bash

diff_output=$(git diff --cached -- '*.cs')

tmpfile="/tmp/git_staged_diff.txt"
echo "$diff_output" > "$tmpfile"

echo "Please review staged changes in your browser:"
echo "  http://localhost:5173/"
echo
open "http://localhost:5173/"

while true; do
  read -p "Are you sure you want to commit? (y/n): " answer < /dev/tty
  case "$answer" in
    [Yy]) exit 0 ;;
    [Nn]) echo "Commit aborted." >&2; exit 1 ;;
    *) echo "Please answer y or n." >&2 ;;
  esac
done
```

3. **Run** 
- enter `dotnet run` in ai-precommit-reviewer/backend-api/CodeReviewApi
- enter `npm run dev` in ai-precommit-reviewer/git-reviewer

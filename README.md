# ai-precommit-reviewer

A developer tool that attempts to integrate LLM code reviews into your workflow, helping you catch and improve issues before they ever reach a human reviewer.

<p align="center">
  <img src="https://github.com/user-attachments/assets/ecbdbb89-07d0-463e-ab2e-8743f6d24d26" alt="ai-precommit-reviewer screenshot" width="80%">
</p>

---

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (for the backend API)  
- [Node.js](https://nodejs.org/) (for the frontend)  
- An [OpenAI API key](https://platform.openai.com/api-keys)  

---

## Installation and Setup

**1. Clone the repo**  
 ```bash
 git clone https://github.com/luka-casey/ai-precommit-reviewer
 cd ai-precommit-reviewer
```

**2. Enter your OpenAi API key**
- Enter your API key in ai-precommmit-reviewer/ReviewerApi/appsettings.json
```
"OpenAI": {
    "ApiKey": "YOUR_OPENAI_API_KEY"
  }
```

**3. Install dependencies**

```
# Backend
cd ReviewerApi
dotnet restore

# Frontend
cd ReviewerUI
npm install
```

**4. (Optional) Pre‑commit Hook**
- _(This creates a commandline hook that opens the app prior to a git commit.
This is optional and has problems working in IDE's where the terminal may be read only.
Recommended to be used in a non-inbuild terminal like iterm2)_

- Copy the following into .git/hooks/pre-commit

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

**5. Run** 
- enter `dotnet run` in ai-precommit-reviewer/ReviewerApi
- enter `npm run dev` in ai-precommit-reviewer/ReviewerUI

import type { CodeReviewRequest } from "../interfaces/CodeReviewRequest";
import type { GitCommitFilePayload } from "../interfaces/GitCommitFilePayload";

/**
 * Fetches the Git changes from the backend API and returns them as a formatted array.
 *
 * @returns {Promise<GitCommitFilePayload[]>} A promise that resolves to a list of Git commit file payloads.
 * @throws {Error} If the response is not OK or the fetch fails.
 */
export async function fetchGitDiff(): Promise<GitCommitFilePayload[]> {
  const res = await fetch('http://localhost:5221/gitdiff');
  if (!res.ok) {
    throw new Error('No staged diff found');
  }
  return res.json();
}

export async function getAiResponseMessage(request: CodeReviewRequest): Promise<any> {

  console.log(request.GptModel)
  const res = await fetch('http://localhost:5221/codereview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error('Failed to review code');
  }

  return res.json();
}
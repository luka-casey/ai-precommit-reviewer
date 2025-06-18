import React, { useEffect, useState } from 'react';

interface ReviewResponse {
  content: string;
}

export const CodeReviewPage: React.FC = () => {
  const [diff, setDiff] = useState('');
  const [review, setReview] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5221/gitdiff') // Adjust port if needed
      .then((res) => {
        if (!res.ok) throw new Error('No staged diff found');
        return res.json();
      })
      .then((data) => setDiff(data.diff))
      .catch((err) => console.error(err));
  }, []);

  const handleReview = async () => {
    setLoading(true);
    setReview(null);

    const res = await fetch('http://localhost:5221/codereview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: diff }),
    });

    const data = await res.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'No suggestions received.';
    setReview(aiResponse);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h2>🔍 Staged Git Diff</h2>
      <pre style={{ background: '#eee', padding: '1rem', maxHeight: '300px', overflowY: 'scroll' }}>
        {diff || 'Loading...'}
      </pre>

      <button onClick={handleReview} disabled={loading || !diff} style={{ marginTop: '1rem' }}>
        {loading ? 'Reviewing...' : 'Send to AI Reviewer'}
      </button>

      {review && (
        <>
          <h3>💡 AI Suggestions</h3>
          <pre style={{ background: '#f5f5f5', padding: '1rem' }}>{review}</pre>
        </>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import type { GitCommitFilePayload } from '../interfaces/GitCommitFilePayload';
import { GitDiffViewer } from '../coreComponents/GitDiffViewer/GitDiffViewer';
import { fetchGitDiff } from '../clients/Clients';

export const CodeReviewPage: React.FC = () => {
  const [diff, setDiff] = useState<GitCommitFilePayload[]>([]);
  // Track view mode (true = inline, false = before/after) per file index
  const [viewModes, setViewModes] = useState<Record<number, boolean>>({});

  useEffect(() => { // test comment
    fetchGitDiff()
      .then(setDiff)
      .catch((err) => console.error(err));
  }, []);

  const toggleView = (index: number) => {
    setViewModes(prev => ({
    ...prev,
    // if prev[index] is undefined, treat it as `true` then flip to `false`
    [index]: !(prev[index] ?? true),
  }));

};
  return (
    <div style={{ padding: '1rem' }}> 
      {diff.map((file, index) => (
        <GitDiffViewer
          key={index}
          file={file}
          showInline={viewModes[index] ?? true}
          onToggle={() => toggleView(index)}
        />
      ))}
    </div>
  );
};

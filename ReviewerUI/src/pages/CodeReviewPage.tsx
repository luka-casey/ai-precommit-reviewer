import React, { useState, useEffect } from 'react';
import type { GitCommitFilePayload } from '../Models/ApiModels';
import { GitDiffViewer } from '../coreComponents/GitDiffViewer/GitDiffViewer';
import { fetchGitDiff } from '../clients/Clients';

export const CodeReviewPage: React.FC = () => {
  const [diff, setDiff] = useState<GitCommitFilePayload[]>([]);
  const [viewModes, setViewModes] = useState<Record<number, boolean>>({});

  useEffect(() => { 
    fetchGitDiff()
      .then(setDiff)
      .catch((err) => console.error(err));
  }, []);

  const toggleView = (index: number) => {
    setViewModes(prev => ({
    ...prev,
    [index]: !(prev[index] ?? true),
  }));

};

//TODO Fix bug where panels are rendering incorrectly 
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

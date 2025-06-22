// InlineDiff.tsx
import React from 'react';
import { DiffBlock } from './DiffBlock';
import type { GitCommitFilePayload } from './interfaces/GitCommitFilePayload';

interface InlineDiffProps {
  diff: GitCommitFilePayload['inlineDiff'];
}

export const InlineDiff: React.FC<InlineDiffProps> = ({ diff }) => (
  <section className="inline-diff">
    <strong>Inline Diff:</strong>
    {diff.afterFileName && <div>Current: {diff.afterFileName}</div>}
    {diff.beforeFileName && <div>Previous: {diff.beforeFileName !== '/dev/null' ? diff.beforeFileName : ''}</div>}
    <DiffBlock text={diff.body} diffType={0} />
  </section>
);
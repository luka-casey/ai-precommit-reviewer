// SideBySideDiff.tsx
import React from 'react';
import { DiffBlock } from './DiffBlock';
import type { GitCommitFilePayload } from './interfaces/GitCommitFilePayload';

interface SideBySideProps {
  before: GitCommitFilePayload['beforeContent'];
  after: GitCommitFilePayload['afterContent'];
}

export const SideBySideDiff: React.FC<SideBySideProps> = ({ before, after }) => (
  <>
    <section className="before-diff">
      <strong>Before:</strong>
      {before.beforeFileName && <div>{before.beforeFileName !== '/dev/null' ? before.beforeFileName : ''}</div>}
      <DiffBlock text={before.body} diffType={1} />
    </section>
    <section className="after-diff">
      <strong>After:</strong>
      {after.afterFileName && <div>{after.afterFileName}</div>}
      <DiffBlock text={after.body} diffType={2} />
    </section>
  </>
);
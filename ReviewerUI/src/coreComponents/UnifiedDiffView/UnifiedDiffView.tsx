import React from 'react';
import { DiffBlock } from '../DiffBlock/DiffBlock';
import type { GitCommitFilePayload } from '../../requestInterfaces/RequestInterfaces';

type DiffMode = 'inline' | 'side-by-side';

interface UnifiedDiffViewProps {
  mode: DiffMode;
  before?: GitCommitFilePayload['beforeContent'];
  after?: GitCommitFilePayload['afterContent'];
  inlineDiff?: GitCommitFilePayload['inlineDiff'];
}

export const UnifiedDiffView: React.FC<UnifiedDiffViewProps> = ({mode, before, after, inlineDiff}) => {

  if (mode === 'side-by-side' && before && after) {
    return (
      <>
        <section>
          <DiffBlock text={before.body} diffType={1} />
        </section>
        <section>
          <DiffBlock text={after.body} diffType={2} />
        </section>
      </>
    );
  }

  if (mode === 'inline' && inlineDiff) {
    return (
        <DiffBlock text={inlineDiff.body} diffType={0} />
    );
  }

  return <div>No diff data available.</div>;
};

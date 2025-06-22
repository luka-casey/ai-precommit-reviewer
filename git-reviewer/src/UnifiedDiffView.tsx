// UnifiedDiffView.tsx
import React from 'react';
import { DiffBlock } from './DiffBlock';
import type { GitCommitFilePayload } from './interfaces/GitCommitFilePayload';
import { AlignJustify, Columns } from 'lucide-react';

type DiffMode = 'inline' | 'side-by-side';

interface UnifiedDiffViewProps {
  mode: DiffMode;
  before?: GitCommitFilePayload['beforeContent'];
  after?: GitCommitFilePayload['afterContent'];
  inlineDiff?: GitCommitFilePayload['inlineDiff'];
  showInline: boolean;
  onToggleView: () => void;
}

export const UnifiedDiffView: React.FC<UnifiedDiffViewProps> = ({
  mode,
  before,
  after,
  inlineDiff,
  showInline,
  onToggleView
}) => {
  if (mode === 'side-by-side' && before && after) {
    return (
      <>
        <section className="before-diff">
          {/* {before.beforeFileName && (
            <div>{before.beforeFileName !== '/dev/null' ? before.beforeFileName : ''}</div>
          )} */}
          <DiffBlock text={before.body} diffType={1} />
        </section>
        <section className="after-diff">
          {/* {after.afterFileName && <div>{after.afterFileName}</div>} */}
          <DiffBlock text={after.body} diffType={2} />
        </section>
      </>
    );
  }

  if (mode === 'inline' && inlineDiff) {
    return (
      <>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', fontSize: '10px'}}>
          {/* {inlineDiff.beforeFileName !== inlineDiff.afterFileName ? (
            <>
              {inlineDiff.afterFileName && <div>Current: {inlineDiff.afterFileName}</div>}
              {inlineDiff.beforeFileName && inlineDiff.beforeFileName !== '/dev/null' && (
                <div>Previous: {inlineDiff.beforeFileName}</div>
              )}
            </>
          ) : (
            inlineDiff.afterFileName && <div>{inlineDiff.afterFileName}</div>
          )} */}
        </div>


      </div>
        
        
        <DiffBlock text={inlineDiff.body} diffType={0} />
      </>
    );
  }

  return <div>No diff data available.</div>;
};

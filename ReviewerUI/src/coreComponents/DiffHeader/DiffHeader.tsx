import React from 'react';
import { AlignJustify, ChevronDown, ChevronUp, Rows2 } from 'lucide-react';
import type { GitCommitFilePayload } from '../../requestInterfaces/RequestInterfaces';

interface DiffHeaderProps {
  file: GitCommitFilePayload;
  minimized: boolean;
  onToggleMinimize: () => void;
  onToggleView: () => void;
  showInline: boolean;
}

export const DiffHeader: React.FC<DiffHeaderProps> = ({file, minimized, showInline, onToggleMinimize, onToggleView}) => {

  const filePath = file.afterContent.afterFileName ?? file.beforeContent.beforeFileName ?? 'Unknown';
  const fileName = file.afterContent.afterFileName?.split('/').pop() ?? file.beforeContent.beforeFileName?.split('/').pop() ?? 'Unknown';

  return (
    <div className="diff-header">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <div>
          <h3 style={{ margin: '0px' }}>{fileName}</h3>
          <div style={{ fontSize: '12px' }}>{filePath}</div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Toggle View */}
          <div className="controls" title="Toggle diff view" style={{display: 'flex', justifyContent: 'flex-end', height: 'fit-content', borderRadius: '50px'}}>
            <button onClick={onToggleView} className="inlineButton" style={{ display: 'flex', padding: '9px' }}>
              {showInline ? <AlignJustify /> : <Rows2 />}
            </button>
          </div>

          {/* Minimize */}
          <div title="Expand / Minimize card" style={{display: 'flex', justifyContent: 'flex-end', height: 'fit-content',borderRadius: '50px',}}>
            <button onClick={onToggleMinimize} className="inlineButton" style={{ display: 'flex', padding: '9px' }}>
              {minimized ? <ChevronDown size={25} /> : <ChevronUp size={25} />}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};
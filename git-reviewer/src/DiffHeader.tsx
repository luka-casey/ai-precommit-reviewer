import React, { useState } from 'react';
import { Columns, AlignJustify, ChevronDown, ChevronUp, Rows2 } from 'lucide-react';
import { MenuItem, Select, InputLabel, FormControl, type SelectChangeEvent } from '@mui/material';

interface DiffHeaderProps {
  index: number;
  fileName: string;
  filePath: string;
  minimized: boolean;
  onToggleMinimize: () => void;
  onToggleView: () => void;
  showInline: boolean;
}

export const DiffHeader: React.FC<DiffHeaderProps> = ({
  index,
  fileName,
  filePath,
  minimized,
  showInline,
  onToggleMinimize,
  onToggleView,
}) => {
  

  return (
    <div className="diff-header">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: '0px' }}>{fileName}</h3>
          <div style={{ fontSize: '12px' }}>{filePath}</div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>

          {/* Toggle View */}
          <div
            className="controls"
            title="Toggle diff view"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              height: 'fit-content',
              borderRadius: '50px',
            }}
          >
            <button
              onClick={onToggleView}
              className="inlineButton"
              style={{ display: 'flex', padding: '9px' }}
            >
              {showInline ? <AlignJustify /> : <Rows2 />}
            </button>
          </div>

          {/* Minimize */}
          <div
            title="Expand / Minimize card"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              height: 'fit-content',
              borderRadius: '50px',
            }}
          >
            <button
              onClick={onToggleMinimize}
              className="inlineButton"
              style={{ display: 'flex', padding: '9px' }}
            >
              {minimized ? <ChevronDown size={25} /> : <ChevronUp size={25} />}
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

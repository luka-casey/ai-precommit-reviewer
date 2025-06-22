// GitDiffViewer.tsx (main component remains)
import React, { useState } from 'react';
import type { GitCommitFilePayload } from './interfaces/GitCommitFilePayload';
import { getAiResponseMessage } from './Clients';
import { DiffHeader } from './DiffHeader';
import { InlineDiff } from './InlineDiff';
import { SideBySideDiff } from './SideBySideDiff';
import { AiResponse } from './AiResponse';
import { AlignJustify, Columns, ArrowUp, MessageSquareShare, Loader2 } from 'lucide-react';
import { UnifiedDiffView } from './UnifiedDiffView';
import './LoaderStyles.css'
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

interface GitDiffViewerProps {
  file: GitCommitFilePayload;
  index: number;
  showInline: boolean;
  onToggle: () => void;
}

export const GitDiffViewer: React.FC<GitDiffViewerProps> = ({ file, index, showInline, onToggle }) => {
  const [minimized, setMinimized] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [aiModel, setAIModel] = useState('gpt-4o-mini');

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value ;
    setAIModel(selectedValue);
  };

  const toggleMinimize = () => setMinimized(prev => !prev);

  const sendToAi = (body: string) => {
    setLoading(true);
    console.log(aiModel)
    getAiResponseMessage({ Code: body, GptModel: aiModel })
      .then(r => setResponse(r.choices?.[0]?.message?.content || ""))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const filePath = file.afterContent.afterFileName
    ?? file.beforeContent.beforeFileName
    ?? 'Unknown';

  const fileName = file.afterContent.afterFileName?.split('/').pop()
    ?? file.beforeContent.beforeFileName?.split('/').pop()
    ?? 'Unknown';

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <div 
        className="git-diff-viewer" 
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#333333',
          padding: '1rem',
          gap: '1rem',
          margin: '10px',
          borderRadius: '15px'
        }}>
        <DiffHeader
          index={index}
          filePath={filePath}
          fileName={fileName}
          minimized={minimized}
          onToggleMinimize={toggleMinimize}
          onToggleView={onToggle}
          showInline={showInline}
        />

        {!minimized && (
          <>
            {showInline
              ? <UnifiedDiffView onToggleView={onToggle} showInline={showInline} mode={'inline'} inlineDiff={file.inlineDiff} /> 
              : <UnifiedDiffView onToggleView={onToggle} showInline={showInline} mode={'side-by-side'} before={file.beforeContent} after={file.afterContent} /> 
            }

            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>

              {/* Dropdown */}
              <div style={{marginRight: '20px'}}>
                <FormControl variant='outlined' fullWidth style={{ minWidth: '120px', }}>
            <InputLabel id="my-select-label" style={{ color: 'white'}}>Model</InputLabel>
            <Select
              labelId="my-select-label" 
              value={aiModel}
              onChange={handleChange}
              label="Option"
              sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '.MuiSvgIcon-root': {
                    color: 'white',
                  },
                }}
            >
              <MenuItem value={"gpt-3.5-turbo"}>gpt-3.5-turbo</MenuItem>
              <MenuItem value={"gpt-4o-mini"}>gpt-4o-mini</MenuItem>
            </Select>
          </FormControl>

              </div>
          

              <button 
                className='inlineButtonSend'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '9px',
                  color: '#1a1a1a',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
                title='Send to Ai'
                onClick={() => sendToAi(file.inlineDiff.body)}
                disabled={loading}
              >
                {loading 
                  ? (
                      <Loader2 
                        style={{ animation: 'spin 1s linear infinite' }}
                      />
                    ) 
                  : <MessageSquareShare />
                }
              </button>
            </div>
          </>
        )}
      </div>
      
      {!minimized && (
      <AiResponse response={response}/>
      )}
      </div>

  );
};



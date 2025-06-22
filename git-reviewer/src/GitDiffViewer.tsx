import './LoaderStyles.css'
import './GitDiffViewerStyles.css'
import React, { useState } from 'react';
import { getAiResponseMessage } from './Clients';
import { DiffHeader } from './DiffHeader';
import { AiResponse } from './AiResponse';
import { UnifiedDiffView } from './UnifiedDiffView';
import { type SelectChangeEvent } from '@mui/material';
import type { GitCommitFilePayload } from './interfaces/GitCommitFilePayload';
import { ModelDropDown } from './ModelDropDown';
import { SendToAiButton } from './SendToAiButton';

interface GitDiffViewerProps {
  file: GitCommitFilePayload;
  showInline: boolean;
  onToggle: () => void;
}

export const GitDiffViewer: React.FC<GitDiffViewerProps> = ({ file, showInline, onToggle }) => {
  const [minimized, setMinimized] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [aiModel, setAIModel] = useState('gpt-4o-mini');

  const sendToAi = (body: string) => {
    setLoading(true);

    getAiResponseMessage({ Code: body, GptModel: aiModel })
      .then(r => setResponse(r.choices?.[0]?.message?.content || ""))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value ;
    setAIModel(selectedValue);
  };

  const toggleMinimize = () => setMinimized(prev => !prev);

  const filePath = file.afterContent.afterFileName
    ?? file.beforeContent.beforeFileName
    ?? 'Unknown';

  const fileName = file.afterContent.afterFileName?.split('/').pop()
    ?? file.beforeContent.beforeFileName?.split('/').pop()
    ?? 'Unknown';

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <div className="gitDiffViewer">
        <DiffHeader
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
              ? <UnifiedDiffView mode={'inline'} inlineDiff={file.inlineDiff} /> 
              : <UnifiedDiffView mode={'side-by-side'} before={file.beforeContent} after={file.afterContent} /> 
            }

            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <ModelDropDown aiModel={aiModel} handleChange={handleChange} />
              <SendToAiButton sendToAi={sendToAi} file={file} loading={loading} />
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



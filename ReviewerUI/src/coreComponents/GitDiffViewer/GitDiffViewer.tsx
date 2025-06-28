import './GitDiffViewerStyles.css'
import React, { useState } from 'react';
import { getAiResponseMessage } from '../../clients/Clients';
import { DiffHeader } from '../DiffHeader/DiffHeader';
import { AiResponse } from '../AiResponse/AiResponse';
import { UnifiedDiffView } from '../UnifiedDiffView/UnifiedDiffView';
import { type SelectChangeEvent } from '@mui/material';
import type { GitCommitFilePayload } from '../../requestInterfaces/RequestInterfaces';
import { ModelDropDown } from '../ModelDropDown/ModelDropDown';
import { SendToAiButton } from '../SendToAiBitton/SendToAiButton';
import { TextInput } from '../TextInput/TextInput';

interface GitDiffViewerProps {
  file: GitCommitFilePayload;
  showInline: boolean;
  onToggle: () => void;
}

export const GitDiffViewer: React.FC<GitDiffViewerProps> = ({ file, showInline, onToggle }) => {
  const [minimized, setMinimized] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [aiModel, setAIModel] = useState('gpt-3.5-turbo');
  const [comment, setComment] = useState("");
  const [preComment, setPreComment] = useState("");

  const sendToAi = (body: string) => {
    setLoading(true);
    setPreComment(comment)

    getAiResponseMessage({ Code: body, GptModel: aiModel, Comment: comment })
      .then(r => {
        setResponse(r.choices?.[0]?.message?.content || "")
        
      })
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
              <TextInput text={comment} setText={setComment} />
              <SendToAiButton isInline={showInline} sendToAi={sendToAi} file={file} loading={loading} />
            </div>

          </>
        )}
      </div>
      
      {!minimized && (
      <AiResponse comment={preComment} response={response}/>
      )}
      </div>
  );
};
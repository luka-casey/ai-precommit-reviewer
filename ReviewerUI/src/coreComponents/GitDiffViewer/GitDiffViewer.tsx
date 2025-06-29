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
  const [minimized, setMinimized] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [aiModel, setAIModel] = useState<string>('gpt-3.5-turbo');
  const [comment, setComment] = useState<string>("");
  const [preComment, setPreComment] = useState<string>("");

  const toggleMinimize = () => setMinimized(prev => !prev);

  const sendToAi = (body: string) => {
    setLoading(true);
    setPreComment(comment)

    getAiResponseMessage({ Code: body, GptModel: aiModel, Comment: comment })
      .then(r => setResponse(r.choices?.[0]?.message?.content || ""))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value ;
    setAIModel(selectedValue);
  };

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <div className="gitDiffViewer">
        <DiffHeader
          file={file}
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
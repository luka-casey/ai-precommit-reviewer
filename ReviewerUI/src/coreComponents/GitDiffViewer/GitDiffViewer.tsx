import './GitDiffViewerStyles.css';
import React, { useState } from 'react';
import { getAiResponseMessage } from '../../clients/Clients';
import { DiffHeader } from '../DiffHeader/DiffHeader';
import { AiResponse } from '../AiResponse/AiResponse';
import { UnifiedDiffView } from '../UnifiedDiffView/UnifiedDiffView';
import { type SelectChangeEvent, Box, Stack, Paper } from '@mui/material';
import type { GitCommitFilePayload } from '../../Models/ApiModels';
import { ModelDropDown } from '../ModelDropDown/ModelDropDown';
import { SendToAiButton } from '../SendToAiBitton/SendToAiButton';
import { TextInput } from '../TextInput/TextInput';
import { stringToGptModel } from '../../HelperFunctions/GptModelHelperFunctions';
import { GptModel } from '../../enums/GptModel';

interface GitDiffViewerProps {
  file: GitCommitFilePayload;
  showInline: boolean;
  onToggle: () => void;
}

export const GitDiffViewer: React.FC<GitDiffViewerProps> = ({ file, showInline, onToggle }) => {
  const [minimized, setMinimized] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [aiModel, setAIModel] = useState<GptModel>(GptModel.Gpt35Turbo);
  const [comment, setComment] = useState<string>("");
  const [preComment, setPreComment] = useState<string>("");

  const toggleMinimize = () => setMinimized(prev => !prev);

  const sendToAi = (body: string) => {
    setLoading(true);
    setPreComment(comment);

    getAiResponseMessage({ Code: body, GptModel: aiModel, Comment: comment })
      .then(r => setResponse(r.choices?.[0]?.message?.content || ""))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAIModel(stringToGptModel(event.target.value));
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <Paper elevation={3} sx={{ flex: 1, p: 2, minWidth: '50%', maxWidth: '100%', backgroundColor: '#333333', borderRadius: '20px' }}>
        <DiffHeader
          file={file}
          minimized={minimized}
          onToggleMinimize={toggleMinimize}
          onToggleView={onToggle}
          showInline={showInline}
        />

        {!minimized && (
          <>
            {showInline ? (
              <UnifiedDiffView mode="inline" inlineDiff={file.inlineDiff} />
            ) : (
              <UnifiedDiffView
                mode="side-by-side"
                before={file.beforeContent}
                after={file.afterContent}
              />
            )}

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="flex-start"
              mt={2}
              className="actionComponentsContainer"
            >
              <ModelDropDown aiModel={aiModel} handleChange={handleChange} />
              <TextInput text={comment} setText={setComment} />
              <SendToAiButton
                isInline={showInline}
                sendToAi={sendToAi}
                file={file}
                loading={loading}
              />
            </Stack>
          </>
        )}
      </Paper>

      {!minimized && (
        <Box flex={1} minWidth="35%">
          <AiResponse comment={preComment} response={response} />
        </Box>
      )}
    </Box>
  );
};

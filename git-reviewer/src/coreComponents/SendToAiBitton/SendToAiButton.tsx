import React from 'react';
import { Loader2, MessageSquareShare } from 'lucide-react';
import type { GitCommitFilePayload } from '../../interfaces/GitCommitFilePayload';

interface SendToAiButtonProps {
  sendToAi: (content: string) => void;
  file: GitCommitFilePayload;
  loading: boolean;
  isInline: boolean
}

export const SendToAiButton: React.FC<SendToAiButtonProps> = ({ sendToAi, file, loading, isInline }) => {

  const handleClick = () => {
    const content = isInline ? file.inlineDiff.body : file.afterContent.body;
    console.log(content);
    sendToAi(content);
  };

  return (
    <button
      className="sendToAiButton"
      title="Send to Ai"
      onClick={() => handleClick()}
      disabled={loading}
      style={{
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? (
        <Loader2 style={{ animation: 'spin 1s linear infinite' }} />
      ) : (
        <MessageSquareShare />
      )}
    </button>
  );
};

import React from 'react';
import { Loader2, MessageSquareShare } from 'lucide-react';

interface SendToAiButtonProps {
  sendToAi: (content: string) => void;
  file: { inlineDiff: { body: string } };
  loading: boolean;
}

export const SendToAiButton: React.FC<SendToAiButtonProps> = ({ sendToAi, file, loading }) => {
  return (
    <button
      className="sendToAiButton"
      title="Send to Ai"
      onClick={() => sendToAi(file.inlineDiff.body)}
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

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AiResponseProps {
  response: string;
}

export const AiResponse: React.FC<AiResponseProps> = ({ response }) => (
  <div style={{backgroundColor: 'rgb(51, 51, 51)', flex: '1', margin: '10px', borderRadius: '15px'}}>
  <div className="ai-response" 
    style={{
      padding: '30px', 
      maxHeight: '600px',
      overflowY: 'scroll',
      overflowX: 'auto'
      }}>
    <ReactMarkdown>{response}</ReactMarkdown>
  </div>
  </div>
);
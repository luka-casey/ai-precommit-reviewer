import React, { useState } from 'react';
import { AlignJustify, Columns, Copy, Check } from 'lucide-react';

interface DiffBlockProps {
  text: string;
  diffType: 0 | 1 | 2;
}

export const DiffBlock: React.FC<DiffBlockProps> = ({ text, diffType }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
        <div
      style={{
        overflowX: 'auto',
        overflowY: 'auto',  // change from 'hidden' to 'auto'
        whiteSpace: 'pre',
        fontFamily: 'monospace',
        backgroundColor: '#1e1e1e',
        color: 'white',
        padding: '0.5rem',
        borderRadius: '4px',
        maxWidth: '100%',
        maxHeight: '500px',  // set max height here
        position: 'relative',
      }}
    >
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          padding: '0.25rem 0.5rem',
          backgroundColor: 'transparent',
          color: 'grey',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '0.8rem',
        }}
      >
        {copied ? <><Check size={12}  />Copied</> : <><Copy size={12} /> Copy</>}
      </button>

      {text.split("\n").map((line, i) => {
        let color: string | undefined;
        if (diffType === 0) {
          if (line.startsWith("+")) color = '#8fd19e';
          else if (line.startsWith("-")) color = '#e27878';
        } else if (diffType === 1) color = '#e27878';
        else if (diffType === 2) color = '#8fd19e';

        return (
          <div key={i} style={{ color }}>
            {line || '\u00A0'}
          </div>
        );
      })}
    </div>
  );
};

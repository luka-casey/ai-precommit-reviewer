import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './DiffBlockStyles.css'

interface DiffBlockProps {
  text: string;
  diffType: 0 | 1 | 2;
}

export const DiffBlock: React.FC<DiffBlockProps> = ({ text, diffType }) => {
  const [copied, setCopied] = useState<boolean>(false);

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
    <div className = 'diffBlockWrapper'>
      <button className = 'diffCopyButton' onClick={handleCopy}>
        {copied ? <><Check size={12}  /> Copied</> : <><Copy size={12} /> Copy</>}
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

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTypewriter } from 'react-simple-typewriter';
import './AiResponseStyles.css'

interface AiResponseProps {
  comment: string;
  response: string;
  typeSpeed?: number;
}

export const AiResponse: React.FC<AiResponseProps> = ({comment, response }) => {
  const [showComment, setShowComment] = useState(false);

  const delaySpeed: number = 0
  const typeSpeed: number = 1

  useEffect(() => {
    if (!comment) return;
    setShowComment(false);
    const t = setTimeout(() => setShowComment(true), 10);
    return () => clearTimeout(t);
  }, [comment]);

  return (
    <div className='AiResponseContainer'>
      <div className="AiResponse">
        {comment && (
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <div className={showComment ? 'fade-in' : ''} style={{backgroundColor: '#4d4d4d', borderRadius: 10, opacity: showComment ? 1 : 0}}>
              <p style={{ textAlign: 'end', color: '#acacac', padding: 8, margin: 6,}}>
                {comment}
              </p>
            </div>
          </div>
        )}
        <TypewriterMarkdown key={response} text={response} typeSpeed={typeSpeed} delaySpeed={delaySpeed} />
      </div>
    </div>
  );
};

interface TypewriterMarkdownProps {
  text: string;
  typeSpeed: number;
  delaySpeed: number;
}

// prevents re-render when a parent re-renders
const typedResponses = new Set<string>();

const TypewriterMarkdown: React.FC<TypewriterMarkdownProps> = ({ text, typeSpeed, delaySpeed }) => {
  const [isDone, setIsDone] = useState(typedResponses.has(text));

  const [twText] = useTypewriter({
    words: [text],
    loop: 1,
    typeSpeed,
    deleteSpeed: 0,
    delaySpeed,
    onLoopDone: () => {
      typedResponses.add(text);
      setIsDone(true);
    },
  });

  return <ReactMarkdown>{isDone ? text : twText}</ReactMarkdown>;
};
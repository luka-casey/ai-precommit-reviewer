import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTypewriter } from 'react-simple-typewriter';

interface AiResponseProps {
  comment: string;
  response: string;
  delaySpeed?: number;
  typeSpeed?: number;
}

export const AiResponse: React.FC<AiResponseProps> = ({
  comment,
  response,
  delaySpeed = 0,
  typeSpeed = 1,
}) => {
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    if (!comment) return;
    setShowComment(false);
    const t = setTimeout(() => setShowComment(true), 10);
    return () => clearTimeout(t);
  }, [comment]);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .react-simple-typewriter__cursor {
          display: none; /* disable blinking cursor */
        }
      `}</style>

      <div
        style={{
          backgroundColor: 'rgb(51, 51, 51)',
          flex: 1,
          margin: 10,
          borderRadius: 15,
        }}
      >
        <div
          className="ai-response"
          style={{
            padding: 30,
            maxHeight: 600,
            overflowY: 'auto',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        >
          {comment && (
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div
                className={showComment ? 'fade-in' : ''}
                style={{
                  backgroundColor: '#4d4d4d',
                  borderRadius: 10,
                  opacity: showComment ? 1 : 0,
                }}
              >
                <p
                  style={{
                    textAlign: 'end',
                    color: '#acacac',
                    padding: 8,
                    margin: 6,
                  }}
                >
                  {comment}
                </p>
              </div>
            </div>
          )}

          <TypewriterMarkdown key={response} text={response} typeSpeed={typeSpeed} delaySpeed={delaySpeed} />
        </div>
      </div>
    </>
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


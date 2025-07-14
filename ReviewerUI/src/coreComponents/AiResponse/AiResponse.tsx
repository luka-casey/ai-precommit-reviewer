import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTypewriter } from 'react-simple-typewriter';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import './AiResponseStyles.css';

interface AiResponseProps {
  comment: string;
  response: string;
  typeSpeed?: number;
}

export const AiResponse: React.FC<AiResponseProps> = ({ comment, response }) => {
  const [showComment, setShowComment] = useState<boolean>(false);

  const delaySpeed: number = 0;
  const typeSpeed: number = 1;

  useEffect(() => {
    if (!comment) return;
    setShowComment(false);
    const t = setTimeout(() => setShowComment(true), 10);
    return () => clearTimeout(t);
  }, [comment]);

  return (
    <Container className="AiResponseContainer">
      <Box className="AiResponse">
        {comment && (
          <Box display="flex" flexDirection="row-reverse">
            <Paper
              elevation={3}
              className={showComment ? 'fade-in' : ''}
              sx={{
                backgroundColor: '#4d4d4d',
                borderRadius: 2,
                opacity: showComment ? 1 : 0,
                maxWidth: '80%',
              }}
            >
              <Typography
                variant="body2"
                sx={{ textAlign: 'end', color: '#acacac', padding: 1, margin: 1 }}
              >
                {comment}
              </Typography>
            </Paper>
          </Box>
        )}
        <TypewriterMarkdown key={response} text={response} typeSpeed={typeSpeed} delaySpeed={delaySpeed} />
      </Box>
    </Container>
  );
};

interface TypewriterMarkdownProps {
  text: string;
  typeSpeed: number;
  delaySpeed: number;
}

const typedResponses = new Set<string>();

const TypewriterMarkdown: React.FC<TypewriterMarkdownProps> = ({ text, typeSpeed, delaySpeed }) => {
  const [isDone, setIsDone] = useState<boolean>(typedResponses.has(text));

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

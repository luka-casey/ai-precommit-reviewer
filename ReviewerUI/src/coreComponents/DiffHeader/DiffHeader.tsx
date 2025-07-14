import React from 'react';
import { IconButton, Tooltip, Box, Typography } from '@mui/material';
import { AlignJustify, ChevronDown, ChevronUp, Rows2 } from 'lucide-react';
import type { GitCommitFilePayload } from '../../Models/ApiModels';

interface DiffHeaderProps {
  file: GitCommitFilePayload;
  minimized: boolean;
  onToggleMinimize: () => void;
  onToggleView: () => void;
  showInline: boolean;
}

export const DiffHeader: React.FC<DiffHeaderProps> = ({ file, minimized, showInline, onToggleMinimize, onToggleView }) => {
  const filePath = file.afterContent.afterFileName ?? file.beforeContent.beforeFileName ?? 'Unknown';
  const fileName = file.afterContent.afterFileName?.split('/').pop() ?? file.beforeContent.beforeFileName?.split('/').pop() ?? 'Unknown';

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      padding="10px"
    >
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" color='white'>
          {fileName}
        </Typography>
        <Typography variant="caption" color="white">
          {filePath}
        </Typography>
      </Box>

      <Box display="flex" gap={1}>
        <Tooltip title="Toggle diff view">
          <IconButton onClick={onToggleView} size="small">
            {showInline ? <AlignJustify color='white' size={20} /> : <Rows2 color='white' size={20} />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Expand / Minimize card">
          <IconButton onClick={onToggleMinimize} size="small">
            {minimized ? <ChevronDown color='white' size={20} /> : <ChevronUp color='white' size={20} />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

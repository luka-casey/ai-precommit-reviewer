import React from 'react';
import { TextField } from '@mui/material';

type TextInputProps = {
  text: string;
  setText: (value: string) => void;
};

export const TextInput: React.FC<TextInputProps> = ({ text, setText }) => {
  return (
    <TextField
      value={text}
      onChange={(e) => setText(e.target.value)}
      sx={{
        marginRight: "20px",
        "& .MuiInputBase-input": {
          color: "white", // Input text
        },
        "& .MuiInputLabel-root": {
          color: "grey", // Label
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // Default border
          },
          "&:hover fieldset": {
            borderColor: "white", // Hover border
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // Focused border
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white", // Focused label
        },
      }}
      fullWidth
      id="outlined-required"
      inputProps={{ maxLength: 100 }}
      label="Add a comment if you wish... (optional)"
    />
  );
};

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

interface ModelDropDownProps {
  aiModel: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export const ModelDropDown: React.FC<ModelDropDownProps> = ({ aiModel, handleChange }) => {
  return (
    <div style={{marginRight: '20px'}}>
    <FormControl  variant="outlined" fullWidth style={{ minWidth: '120px' }}>
      <InputLabel id="my-select-label" style={{ color: 'white' }}>Model</InputLabel>
      <Select labelId="my-select-label" value={aiModel} onChange={handleChange} label="Option"
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '.MuiSvgIcon-root': {
            color: 'white',
          },
        }}
      >
        <MenuItem value="gpt-3.5-turbo">gpt-3.5-turbo</MenuItem>
        <MenuItem value="gpt-4o-mini">gpt-4o-mini</MenuItem>
      </Select>
    </FormControl>
    </div>
  );
};
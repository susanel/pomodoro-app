import { ChangeEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';

import { camelize } from '../utils/camelize';

type FormMode = 'create' | 'edit';

export type FormData = CreateFormData | EditFormData;

export interface CreateFormData {
  title: string;
  note: string;
  estimatedCount: number;
}

export interface EditFormData {
  title: string;
  note: string;
  actualCount: number;
  estimatedCount: number;
}

export interface FormConfig {
  formData: FormData;
  mode: FormMode;
}

interface FormProps {
  config: FormConfig;
  handleFormData: (newState: Partial<FormData>) => void;
}

const Form: React.FC<FormProps> = ({ config, handleFormData }) => {
  const { formData, mode } = config;
  const [showNote, setShowNote] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const formattedName = camelize(name);

    const newState = {
      [formattedName]: type === 'number' ? Number(value) : value,
    };
    handleFormData(newState);
  };

  const handleIncrementInput = (count: number) => {
    if (count >= 99) return count;
    if (count < 1) {
      const nr = parseFloat((count + 0.1).toFixed(1));
      return nr;
    }
    return count + 1;
  };

  const handleDecrementInput = (count: number) => {
    if (count <= 0) return count;
    if (count <= 1) {
      const nr = parseFloat((count - 0.1).toFixed(1));
      return nr;
    }
    return count - 1;
  };

  return (
    <Box component="form">
      <Box sx={{ py: 1 }}>
        <InputBase
          name="title"
          sx={{
            width: '100%',
            fontSize: '22px',
            fontWeight: 700,
            fontStyle: 'italic',
            color: 'rgb(85, 85, 85)',
          }}
          placeholder="What are you working on?"
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
        ></InputBase>
      </Box>
      <Box sx={{ py: 1 }}>
        <InputLabel
          shrink
          sx={{
            color: 'rgb(85, 85, 85)',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          {mode === 'create' ? 'Est Pomodoros' : `Act \/ Est Pomodoros`}
        </InputLabel>

        {mode !== 'create' && (
          <>
            <InputBase
              id="actual-count"
              name="actual-count"
              type="number"
              value={(formData as EditFormData).actualCount}
              sx={{
                width: '75px',
                p: 1.25,
                backgroundColor: 'rgb(239, 239, 239)',
                borderRadius: '6px',
                fontWeight: 700,
                color: 'rgb(187, 187, 187)',
              }}
              inputProps={{ min: 0, max: 99 }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            ></InputBase>
            <Typography
              variant="body1"
              component="span"
              sx={{ mx: 0.75, color: 'rgb(170, 170, 170)' }}
            >
              /
            </Typography>
          </>
        )}

        <InputBase
          id="estimated-count"
          name="estimated-count"
          type="number"
          value={formData.estimatedCount}
          sx={{
            width: '75px',
            backgroundColor: 'rgb(239, 239, 239)',
            mr: 1.25,
            p: 1.25,
            borderRadius: '6px',
            color: 'rgb(85, 85, 85)',
            fontWeight: 700,
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
        ></InputBase>
        <IconButton
          variant="outlined"
          sx={{ mr: '4px' }}
          onClick={() => {
            const newCount = handleIncrementInput(formData.estimatedCount);
            handleFormData({ estimatedCount: newCount });
          }}
        >
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          onClick={() => {
            const newCount = handleDecrementInput(formData.estimatedCount);
            handleFormData({ estimatedCount: newCount });
          }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      <Box sx={{ py: 1 }}>
        {!showNote && (
          <Button
            variant="text"
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              color: 'rgb(136, 136, 136)',
              fontWeight: 700,
              textDecoration: 'underline',
            }}
            onClick={() => {
              setShowNote(!showNote);
            }}
          >
            + Add Note
          </Button>
        )}
        {showNote && (
          <InputBase
            name="note"
            value={formData.note}
            sx={{
              width: '100%',
              px: 1.75,
              py: 1.25,
              borderRadius: '6px',
              backgroundColor: 'rgb(239, 239, 239)',
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Form;

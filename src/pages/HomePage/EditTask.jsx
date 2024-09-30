import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const EditTask = ({
  task,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleShowEditTask,
}) => {
  const { id, title, note, estimatedCount } = task || {};

  const [inputCount, setInputCount] = useState(estimatedCount || 1);
  const [taskTitle, setTaskTitle] = useState(title || '');
  const [taskNote, setTaskNote] = useState(note || '');
  const [showNote, setShowNote] = useState(!!note || false);

  const handleIncrementInput = () => {
    if (inputCount < 1) {
      const nr = parseFloat((inputCount + 0.1).toFixed(1));
      return setInputCount(nr);
    }
    return setInputCount(inputCount + 1);
  };

  const handleDecrementInput = () => {
    if (inputCount <= 0) return;
    if (inputCount <= 1) {
      const nr = parseFloat((inputCount - 0.1).toFixed(1));
      return setInputCount(nr);
    }
    return setInputCount(inputCount - 1);
  };

  const handleEsimatedPomodoros = (e) => {
    setInputCount(e.target.value * 1);
  };

  const handleTaskTitle = (e) => {
    return setTaskTitle(e.target.value);
  };

  const handleTaskNote = (e) => {
    return setTaskNote(e.target.value);
  };

  const handleSaveTask = (e) => {
    if (!task) {
      const newTask = {
        title: taskTitle,
        estimatedCount: inputCount,
        actualCount: 0,
        note: taskNote,
        isActive: false,
      };
      handleAddTask(newTask);
      handleShowEditTask();
    } else {
      handleEditTask(id, {
        title: taskTitle,
        estimatedCount: inputCount,
        note: taskNote,
        type: 'display',
      });
    }
  };

  const handleCancelTask = () => {
    if (!id) return handleShowEditTask();
    return handleEditTask(id, { type: 'display' });
  };

  return (
    <Card sx={{ mt: 1.5 }}>
      <CardContent>
        <Box component="form">
          <Box sx={{ py: 1 }}>
            <InputBase
              sx={{
                width: '100%',
                fontSize: '22px',
                fontWeight: 700,
                fontStyle: 'italic',
                color: 'rgb(85, 85, 85)',
              }}
              variant="standard"
              placeholder="What are you working on?"
              value={taskTitle}
              onChange={(e) => {
                handleTaskTitle(e);
              }}
            ></InputBase>
          </Box>
          <Box sx={{ py: 1 }}>
            {/* <FormControl> */}
            <InputLabel
              shrink
              htmlFor="est-pomodoros"
              sx={{
                color: 'rgb(85, 85, 85)',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              Est Pomodoros
            </InputLabel>
            <InputBase
              id="est-pomodoros"
              variant="filled"
              type="number"
              label="Est Pomodoros"
              value={inputCount}
              slotProps={{
                input: {
                  min: 0,
                  max: 99,
                },
              }}
              sx={{
                width: '75px',
                backgroundColor: 'rgb(239, 239, 239)',
                mr: 1.25,
                p: 1.25,
                borderRadius: '6px',
                color: 'rgb(85, 85, 85)',
                fontWeight: 700,
              }}
              onChange={(e) => {
                handleEsimatedPomodoros(e);
              }}
            ></InputBase>
            <IconButton
              variant="outlined"
              sx={{ mr: '4px' }}
              onClick={() => handleIncrementInput()}
            >
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton
              variant="outlined"
              onClick={() => handleDecrementInput()}
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
                value={taskNote}
                sx={{
                  width: '100%',
                  px: 1.75,
                  py: 1.25,
                  borderRadius: '6px',
                  backgroundColor: 'rgb(239, 239, 239)',
                }}
                onChange={(e) => {
                  handleTaskNote(e);
                }}
              />
            )}
          </Box>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          py: 1.75,
          px: 2.5,
          backgroundColor: 'rgb(239, 239, 239)',
          justifyContent: 'space-between',
        }}
      >
        {!!task && (
          <Button
            variant="text"
            sx={{
              py: 1,
              justifyContent: 'flex-start',
              color: 'rgb(136, 136, 136)',
              fontWeight: 700,
            }}
            onClick={() => handleDeleteTask(id)}
          >
            Delete
          </Button>
        )}

        <Box sx={{ ml: 'auto' }}>
          <Button
            variant="text"
            sx={{
              mr: 1.75,
              py: 1,
              flexWrap: 1,
              color: 'rgb(136, 136, 136)',
              fontWeight: 700,
            }}
            onClick={() => handleCancelTask()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'black' }}
            onClick={() => handleSaveTask()}
          >
            Save
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default EditTask;

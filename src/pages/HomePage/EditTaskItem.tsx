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
import { Typography } from '@mui/material';
import { Task } from '../../data/data';

type EditTaskItemProps = {
  task: Task;
  handleAddTask: () => {};
  handleEditTask: () => {};
  handleDeleteTask: () => {};
  handleShowNewTask: () => {};
  handleChangeEditedTask: () => {};
};

const EditTaskItem: React.FC<EditTaskItemProps> = ({
  task,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleShowNewTask,
  handleChangeEditedTask,
}) => {
  const { id, title, note, estimatedCount, actualCount } = task || {};

  const [taskEstimatedCount, setTaskEstimatedCount] = useState(
    estimatedCount || 1
  );
  const [taskActualCount, setTaskActualCount] = useState(actualCount || 0);
  const [taskTitle, setTaskTitle] = useState(title || '');
  const [taskNote, setTaskNote] = useState(note || '');
  const [showNote, setShowNote] = useState(!!note || false);

  const handleIncrementInput = () => {
    if (taskEstimatedCount >= 99) return;
    if (taskEstimatedCount < 1) {
      const nr = parseFloat((taskEstimatedCount + 0.1).toFixed(1));
      return setTaskEstimatedCount(nr);
    }
    return setTaskEstimatedCount(taskEstimatedCount + 1);
  };

  const handleDecrementInput = () => {
    if (taskEstimatedCount <= 0) return;
    if (taskEstimatedCount <= 1) {
      const nr = parseFloat((taskEstimatedCount - 0.1).toFixed(1));
      return setTaskEstimatedCount(nr);
    }
    return setTaskEstimatedCount(taskEstimatedCount - 1);
  };

  const handleEsimatedCountChange = (e) => {
    setTaskEstimatedCount(e.target.value * 1);
  };

  const handleActualCountChange = (e) => {
    setTaskActualCount(e.target.value * 1);
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
        estimatedCount: taskEstimatedCount,
        actualCount: 0,
        note: taskNote,
      };
      handleAddTask(newTask);
      handleShowNewTask();
    } else {
      handleEditTask(id, {
        title: taskTitle,
        estimatedCount: taskEstimatedCount,
        actualCount: taskActualCount,
        note: taskNote,
      });
      handleChangeEditedTask(null);
    }
  };

  const handleCancelTask = () => {
    if (!id) return handleShowNewTask();
    return handleChangeEditedTask(null);
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
            <InputLabel
              shrink
              sx={{
                color: 'rgb(85, 85, 85)',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {id ? 'Act \\ Est Pomodoros' : 'Est Pomodoros'}
            </InputLabel>
            {id && (
              <>
                <InputBase
                  id="act-pomodoros"
                  type="number"
                  value={taskActualCount}
                  sx={{
                    width: '75px',
                    p: 1.25,
                    backgroundColor: 'rgb(239, 239, 239)',
                    borderRadius: '6px',
                    fontWeight: 700,
                    color: 'rgb(187, 187, 187)',
                  }}
                  inputProps={{ min: 0, max: 99 }}
                  onChange={(e) => {
                    handleActualCountChange(e);
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
              id="est-pomodoros"
              variant="filled"
              type="number"
              label="Est Pomodoros"
              value={taskEstimatedCount}
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
                handleEsimatedCountChange(e);
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

export default EditTaskItem;

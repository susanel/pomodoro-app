import React, { ChangeEvent, useState } from 'react';

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
import { EditedTaskIdOptions } from './HomePage';

// type EditTaskItemProps = {
//   task?: Task;
//   handleAddTask: (task: Omit<Task, 'id'>) => void;
//   handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
//   handleDeleteTask: (taskId: Task['id']) => void;
//   handleChangeEditedTask: (taskId: Task['id'] | null) => void;
// };

interface EditTaskItemProps {
  task?: Task;
  handleAddTask: (task: Omit<Task, 'id'>) => void;
  handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
  handleDeleteTask: (taskId: Task['id']) => void;
  handleChangeEditedTask: (taskId: EditedTaskIdOptions) => void;
}

const EditTaskItem: React.FC<EditTaskItemProps> = ({
  task,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
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

  const handleEsimatedCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskEstimatedCount(Number(e.target.value));
  };

  const handleActualCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskActualCount(Number(e.target.value));
  };

  const handleTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setTaskTitle(e.target.value);
  };

  const handleTaskNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setTaskNote(e.target.value);
  };

  const handleSaveTask = () => {
    if (!id) {
      const newTask = {
        title: taskTitle,
        estimatedCount: taskEstimatedCount,
        actualCount: 0,
        note: taskNote,
        isDone: false,
      };
      handleAddTask(newTask);
      handleChangeEditedTask(undefined);
    } else {
      handleEditTask(id, {
        title: taskTitle,
        estimatedCount: taskEstimatedCount,
        actualCount: taskActualCount,
        note: taskNote,
      });
      handleChangeEditedTask(undefined);
    }
  };

  const handleCancelTask = () => {
    return handleChangeEditedTask(undefined);
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
              placeholder="What are you working on?"
              value={taskTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
              type="number"
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
        {!!id && (
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

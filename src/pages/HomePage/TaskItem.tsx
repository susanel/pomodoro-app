import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import {
  setActiveTaskId,
  setEditedTaskId,
  toggleTaskIsCompleted,
} from './TasksSlice';
import { stopTimer } from './TimerSlice';
import { Task } from '../../data/data';
import { RootState } from '../../redux/store';
import { POMODORO_MODE } from '../../utils/constants';

interface TaskItemProps {
  task: Task;
  // isActive: boolean;
  // editedTaskId: EditedTaskIdOptions;
  // handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
  // handleChangeActiveTask: (taskId: Task['id']) => void;
  // handleChangeEditedTask: (taskId: EditedTaskIdOptions) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { id, title, note, actualCount, estimatedCount } = task;
  const { editedTaskId, activeTaskId } = useSelector(
    (state: RootState) => state.tasks
  );
  const isTimerRunning = useSelector(
    (state: RootState) => state.timer.isTimerRunning
  );
  const pomodoroMode = useSelector(
    (state: RootState) => state.timer.pomodoroMode
  );

  const dispatch = useDispatch();

  const handleChangeActiveTask = () => {
    const isTaskRunning =
      activeTaskId && isTimerRunning && pomodoroMode === POMODORO_MODE.POMODORO;
    if (isTaskRunning) {
      const shouldChangeTask = confirm(
        'The timer will be reset. Do you want to switch task?'
      );
      if (shouldChangeTask) {
        dispatch(stopTimer());
        dispatch(setActiveTaskId(id));
      } else return;
    }
    dispatch(setActiveTaskId(id));
  };

  const handleToggleTaskCompleted = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(toggleTaskIsCompleted(id));
  };

  const handleShowTaskDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (editedTaskId) {
      const shouldEditAnotherTask = confirm(
        'The change will be lost. Are you sure you want to close it?'
      );
      if (!shouldEditAnotherTask) return;
    }
    dispatch(setEditedTaskId(id));
  };

  return (
    <Card
      sx={{
        mt: 1,
        mb: 1,
        py: 2.25,
        px: 1.75,
        borderLeft: '6px solid white',
        '&:hover': {
          borderLeft: '6px solid rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        },
        ...(activeTaskId === id && {
          borderLeft: '6px solid rgb(34, 34, 34);',
          '&:hover': {
            borderLeft: '6px solid rgb(34, 34, 34)',
            cursor: 'pointer',
          },
        }),
      }}
      onClick={() => {
        handleChangeActiveTask();
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Dlaczego IconButton nie ma parametru variant, a jednak style sa dodawane poprawnie? */}
        <IconButton
          variant="contained"
          sx={{
            mr: 1.25,
            p: 0,
            opacty: 1,
            '&:hover': {
              opacity: 0.6,
            },
          }}
          onClick={(e) => {
            handleToggleTaskCompleted(e);
          }}
        >
          <CheckCircleIcon
            fontSize="inherit"
            sx={{
              fontSize: '30px',
              color: task.isCompleted
                ? 'rgb(186, 73, 73)'
                : 'rgb(223, 223, 223)',
            }}
          />
        </IconButton>
        <Typography
          variant="body1"
          sx={{ flexGrow: 1, fontWeight: 700, color: 'rgb(85, 85, 85)' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          sx={{
            color: 'rgb(170, 170, 170)',
            fontWeight: 700,
            letterSpacing: '3px',
          }}
        >
          <Typography
            variant="body2"
            component="span"
            fontSize="18px"
            sx={{ letterSpacing: 'inherit' }}
          >
            {actualCount}
          </Typography>
          /{estimatedCount}
        </Typography>
        <IconButton
          variant="outlined"
          sx={{ ml: 2.25, py: 0.25, px: 0.5 }}
          onClick={(e) => handleShowTaskDetails(e)}
        >
          <MoreIcon />
        </IconButton>
      </Box>

      {note && (
        <Box
          sx={{
            mt: 1,
            pl: 3.75,
            color: 'rgb(96, 85, 21) ',
          }}
        >
          <Typography
            sx={{
              py: 1.25,
              px: 1.5,
              borderRadius: '8px',
              backgroundColor: 'rgb(252, 248, 222)',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px',
            }}
          >
            {note}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default TaskItem;

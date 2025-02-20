import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { increaseActualCount, incrementTaskIteration } from './TasksSlice';
import {
  countDown,
  setMode,
  setNextMode,
  setTimer,
  startTimer,
  stopTimer,
} from './TimerSlice';
import alarmSound from '../../assets/audio/alarm.mp3';
import clickSound from '../../assets/audio/click.mp3';
import TimeBar from '../../components/TimeBar';
import { modes } from '../../data/data';
import { RootState } from '../../redux/store';
import { getPaletteColor } from '../../utils/color';
import { POMODORO_MODE } from '../../utils/constants';
import { playAudio } from '../../utils/playAudio';
import { selectActiveTask } from '../../redux/selectors';

dayjs.extend(duration);

interface StyledButtonsProps {
  variant: 'contained' | 'text';
  color: 'primary' | 'secondary';
}

const getButtonStyles = (
  pomodoroMode: POMODORO_MODE,
  buttonMode: POMODORO_MODE
): StyledButtonsProps => {
  return pomodoroMode === buttonMode
    ? { variant: 'contained', color: 'secondary' }
    : { variant: 'text', color: 'primary' };
};

interface TimerProps {
  // pomodoroMode: POMODORO_MODE; // can take enum?
  // activeTask: Task;
  // isCounting: boolean;
  // setIsCounting: (isCounting: boolean) => void;
  // handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
  // handleModeChange: (mode?: POMODORO_MODE) => void;
  // handleTasksIterationChange: (data: Partial<TaskIteration>) => void;
}

const Timer: React.FC<TimerProps> = () => {
  const { pomodoroMode, isTimerRunning, timer } = useSelector(
    (state: RootState) => state.timer
  );

  const { activeTaskId, activeTask } = useSelector(selectActiveTask);

  const dispatch = useDispatch();

  const handleTimerModeChange = (mode: POMODORO_MODE) => {
    if (isTimerRunning) dispatch(stopTimer());
    dispatch(setMode(mode));
  };

  useEffect(() => {
    dispatch(setTimer(computeTaskTime()));
  }, [activeTaskId, activeTask?.estimatedCount, pomodoroMode]);

  const computeTaskTime = () => {
    if (!activeTaskId || pomodoroMode !== POMODORO_MODE.POMODORO)
      return modes[pomodoroMode].duration;
    const multiplier =
      activeTask!.estimatedCount < 1 ? activeTask!.estimatedCount : 1;
    return modes[pomodoroMode].duration * multiplier;
  };

  useEffect(() => {
    let intervalId: number;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        dispatch(countDown());
      }, 1000);
      return () => clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  // should i add custom hooks here?
  useEffect(() => {
    if (timer <= 0) {
      dispatch(increaseActualCount(activeTaskId));
      dispatch(stopTimer());
      playAudio(alarmSound);
      dispatch(setNextMode());
      if (pomodoroMode === POMODORO_MODE.POMODORO)
        dispatch(incrementTaskIteration());
    }
    handleDocumentTitle();
  }, [timer]);

  const handleDocumentTitle = () => {
    let titleText = '';
    switch (pomodoroMode) {
      case POMODORO_MODE.POMODORO:
        titleText = activeTask ? activeTask.title : 'Time to focus!';
        break;
      case POMODORO_MODE.SHORT_BREAK:
      case POMODORO_MODE.LONG_BREAK:
        titleText = 'Time for a break!';
        break;
    }

    document.title = `${dayjs(timer).format('mm:ss')} - ${titleText}`;
  };

  const handleSkipCurrentMode = () => {
    dispatch(setNextMode());
    if (pomodoroMode === POMODORO_MODE.POMODORO && activeTaskId) {
      dispatch(increaseActualCount(activeTaskId));
    }

    if (pomodoroMode === POMODORO_MODE.POMODORO)
      dispatch(incrementTaskIteration());
  };

  const handleTimerToggle = () => {
    playAudio(clickSound);
    dispatch(isTimerRunning ? stopTimer() : startTimer());
  };

  const countTaskProgress = () => {
    if (!activeTask) return 0;
    const modeDuration = modes[pomodoroMode].duration;
    const multiplier =
      pomodoroMode === POMODORO_MODE.POMODORO && activeTask.estimatedCount < 1
        ? activeTask.estimatedCount
        : 1;
    const max = Math.floor(modeDuration * multiplier);

    return ((max - timer) / max) * 100;
  };

  return (
    <>
      <TimeBar value={countTaskProgress()} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '480px',
          m: '0 auto 20px',
          pt: 2.5,
          pb: 3.75,
          borderRadius: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ m: '0 auto' }}>
          <Button
            {...getButtonStyles(pomodoroMode, POMODORO_MODE.POMODORO)}
            onClick={() => handleTimerModeChange(POMODORO_MODE.POMODORO)}
          >
            Pomodoro
          </Button>
          <Button
            {...getButtonStyles(pomodoroMode, POMODORO_MODE.SHORT_BREAK)}
            onClick={() => handleTimerModeChange(POMODORO_MODE.SHORT_BREAK)}
          >
            Short Break
          </Button>
          <Button
            {...getButtonStyles(pomodoroMode, POMODORO_MODE.LONG_BREAK)}
            onClick={() => handleTimerModeChange(POMODORO_MODE.LONG_BREAK)}
          >
            Long Break
          </Button>
        </Box>

        <Box sx={{ m: '0 auto', fontSize: '120px', fontWeight: 700 }}>
          <span>{dayjs.duration(timer).format('mm:ss')}</span>
        </Box>

        <Box
          sx={{
            mt: '20px',
            display: 'grid',
            px: 2,
            gridTemplateColumns: '1fr min-content 1fr',
            boxSizing: 'border-box',
          }}
        >
          <Button
            variant="contained"
            color="tertiary"
            sx={{
              width: '200px',
              lineHeight: '55px',
              fontSize: '22px',
              fontWeight: '700',
              gridColumn: '2 / span 1',
              p: 0,
              color: getPaletteColor(pomodoroMode),
              ...(isTimerRunning && {
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' },
              }),
            }}
            onClick={() => handleTimerToggle()}
          >
            {isTimerRunning ? 'pause' : 'start'}
          </Button>

          <IconButton
            sx={{
              fontSize: '44px',
              gridColumn: '3 / span 1',
              p: 0,
              transition: 'opacity .2s ease-out',
              opacity: isTimerRunning ? 1 : 0,
              pointerEvents: isTimerRunning ? 'auto' : 'none',
              '&:hover': {
                opacity: '0.8',
                backgroundColor: 'rgba(0, 0, 0, 0)',
              },
            }}
            onClick={() => handleSkipCurrentMode()}
          >
            <SkipNextIcon fontSize="inherit" sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
export default Timer;

import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconButton from '@mui/material/IconButton';

import { modes, Task } from '../../data/data';
import TimeBar from '../../components/TimeBar';
import { getPaletteColor } from '../../utils/color';
import { POMODORO_MODE } from '../../utils/constants';
import alarmSound from '../../assets/audio/alarm.mp3';
import clickSound from '../../assets/audio/click.mp3';
import { TaskIteration } from '../../App';

dayjs.extend(duration);

const getButtonStyles = (
  pomodoroMode: POMODORO_MODE,
  buttonMode: POMODORO_MODE
) => {
  return pomodoroMode === buttonMode
    ? { variant: 'contained', color: 'secondary' }
    : { variant: 'text', color: 'primary' };
};

// type TimerProps = {
//   pomodoroMode: POMODORO_MODE; // can take enum?
//   activeTask: Task;
//   isCounting: boolean;
//   setIsCounting: (isCounting: boolean) => void;
//   handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
//   handleModeChange: (mode?: POMODORO_MODE) => void;
//   handleTasksIterationChange: (data: Partial<TaskIteration>) => void;
// };

interface TimerProps {
  pomodoroMode: POMODORO_MODE; // can take enum?
  activeTask: Task;
  isCounting: boolean;
  setIsCounting: (isCounting: boolean) => void;
  handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
  handleModeChange: (mode?: POMODORO_MODE) => void;
  handleTasksIterationChange: (data: Partial<TaskIteration>) => void;
};

const Timer: React.FC<TimerProps> = ({
  pomodoroMode,
  activeTask,
  isCounting,
  setIsCounting, // should I pass useState functions down to other components?
  handleEditTask,
  handleModeChange,
  handleTasksIterationChange,
}) => {
  const [timer, setTimer] = useState(modes[pomodoroMode].duration);

  const handleTimerModeChange = (mode: POMODORO_MODE) => {
    setIsCounting(false);
    setTimer(modes[mode].duration);
    handleModeChange(mode);
  };

  useEffect(() => {
    if (pomodoroMode !== POMODORO_MODE.POMODORO) return;
    if (!activeTask) return setTimer(modes[pomodoroMode].duration);

    calculateCurrentTaskDuration();
  }, [activeTask]);

  useEffect(() => {
    let intervalId: number;
    if (isCounting) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer.subtract({ seconds: 1 }));
      }, 1000);
      return () => clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isCounting]);

  useEffect(() => {
    if (timer.asSeconds() === 0) {
      handleEditTask(activeTask.id, {
        actualCount: activeTask.actualCount + 1,
      });
      setIsCounting(false);
      const audio = new Audio(alarmSound);
      audio.play();
      handleModeChange();

      if (pomodoroMode === POMODORO_MODE.POMODORO)
        handleTasksIterationChange({ isCompleted: true });
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

    document.title = `${timer.format('mm:ss')} - ${titleText}`;
  };

  useEffect(() => {
    setIsCounting(false);
    setTimer(modes[pomodoroMode].duration);
  }, [pomodoroMode]);

  const handleSkipCurrentMode = () => {
    setIsCounting(false);
    handleModeChange();
    if (pomodoroMode === POMODORO_MODE.POMODORO && activeTask) {
      handleEditTask(activeTask.id, {
        actualCount:
          activeTask.actualCount +
          (activeTask.estimatedCount <= 1 ? activeTask.estimatedCount : 1),
      });
    }

    if (pomodoroMode === POMODORO_MODE.POMODORO)
      handleTasksIterationChange({ isCompleted: true });
  };

  const handleTimer = () => {
    const audio = new Audio(clickSound);
    audio.play();
    setIsCounting(!isCounting);
  };

  const calculateCurrentTaskDuration = () => {
    const durationInMins = modes[pomodoroMode].duration.asMinutes();

    const updatedDuration = dayjs.duration(
      durationInMins *
        (activeTask.estimatedCount > 1 ? 1 : activeTask.estimatedCount),
      'minutes'
    );

    return setTimer(updatedDuration);
  };

  const countTaskProgress = () => {
    if (!activeTask) return 0;
    const modeDuration = modes[pomodoroMode].duration.asSeconds();
    const multiplier =
      pomodoroMode === POMODORO_MODE.POMODORO && activeTask.estimatedCount < 1
        ? activeTask.estimatedCount
        : 1;
    const max = Math.floor(modeDuration * multiplier);

    return ((max - timer.asSeconds()) / max) * 100;
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
          <span>{timer.format('mm:ss')}</span>
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
              ...(isCounting && {
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' },
              }),
            }}
            onClick={() => handleTimer()}
          >
            {isCounting ? 'pause' : 'start'}
          </Button>

          <IconButton
            sx={{
              fontSize: '44px',
              gridColumn: '3 / span 1',
              p: 0,
              transition: 'opacity .2s ease-out',
              opacity: isCounting ? 1 : 0,
              pointerEvents: isCounting ? 'auto' : 'none',
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

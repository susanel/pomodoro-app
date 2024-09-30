import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconButton from '@mui/material/IconButton';

import { modes } from '../../data/data';
import TimeBar from '../../components/TimeBar';
import { getPaletteColor } from '../../utils/color';

dayjs.extend(duration);

const getButtonStyles = (pomodoroMode, buttonMode) => {
  return pomodoroMode === buttonMode
    ? { variant: 'contained', color: 'secondary' }
    : { variant: 'text', color: 'primary' };
};

const Timer = ({
  pomodoroMode,
  handleEditTask,
  handleModeChange,
  activeTask,
}) => {
  const [timer, setTimer] = useState(
    modes.find((m) => m.type === pomodoroMode).duration
  );
  const [isCounting, setIsCounting] = useState(false);
  // const [mode]

  const handleTimerModeChange = (e, mode) => {
    // e.preventDefault();

    setIsCounting(false);
    setTimer(modes.find((m) => m.type === mode).duration);
    handleModeChange(mode);
  };

  useEffect(() => {
    if (pomodoroMode !== 'pomodoro') return;
    if (!activeTask)
      return setTimer(modes.find((m) => m.type === pomodoroMode).duration);
    // if (activeTask.estimatedCount >= 1) return;

    calculateCurrentTaskDuration(activeTask);
  }, [activeTask]);

  useEffect(() => {
    let intervalId;
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
    }

    handleDocumentTitle();
  }, [timer]);

  const handleDocumentTitle = () => {
    let titleText = '';
    switch (pomodoroMode) {
      case 'pomodoro':
        titleText = activeTask ? activeTask.title : 'Time to focus!';
        break;
      case 'short break':
      case 'long break':
        titleText = 'Time for a break!';
        break;
    }

    document.title = `${timer.format('mm:ss')} - ${titleText}`;
  };

  useEffect(() => {
    setIsCounting(false);
    setTimer(modes.find((m) => m.type === pomodoroMode).duration);
  }, [pomodoroMode]);

  const handleSkipCurrentMode = () => {
    handleModeChange();
    if (pomodoroMode === 'pomodoro' && activeTask) {
      handleEditTask(activeTask.id, {
        actualCount:
          activeTask.actualCount +
          (activeTask.estimatedCount <= 1 ? activeTask.estimatedCount : 1),
      });
    }
  };

  const calculateCurrentTaskDuration = () => {
    const durationInMins = modes
      .find((m) => m.type === pomodoroMode)
      .duration.asMinutes();

    const updatedDuration = dayjs.duration(
      durationInMins *
        (activeTask.estimatedCount > 1 ? 1 : activeTask.estimatedCount),
      'minutes'
    );

    return setTimer(updatedDuration);
  };

  const countTaskProgress = () => {
    const modeDuration = modes
      .find((m) => m.type === pomodoroMode)
      .duration.asSeconds();
    const multiplier =
      pomodoroMode === 'pomodoro' && activeTask ? activeTask.estimatedCount : 1;
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
            {...getButtonStyles(pomodoroMode, 'pomodoro')}
            onClick={(e) => handleTimerModeChange(e, 'pomodoro')}
          >
            Pomodoro
          </Button>
          <Button
            {...getButtonStyles(pomodoroMode, 'short break')}
            onClick={(e) => handleTimerModeChange(e, 'short break')}
          >
            Short Break
          </Button>
          <Button
            {...getButtonStyles(pomodoroMode, 'long break')}
            onClick={(e) => handleTimerModeChange(e, 'long break')}
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
            onClick={() => {
              setIsCounting(!isCounting);
            }}
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

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage/HomePage';
import { modes, modesOrder } from './data/data';
import { getPaletteColor } from './utils/color';
import { POMODORO_MODE } from './utils/constants';

function App() {
  const [pomodoroMode, setPomodoroMode] = useState(POMODORO_MODE.POMODORO);
  const [modeCount, setModeCount] = useState(1);
  const [tasksIteration, setTasksIteration] = useState({
    count: 1,
    isCompleted: false,
  });

  useEffect(() => {
    handleFaviconChange();
  }, [pomodoroMode]);

  const handleModeChange = (mode) => {
    if (!mode) {
      const newModeCount = modeCount === 8 ? 1 : modeCount + 1;
      const newMode = modesOrder[newModeCount - 1].type;
      setModeCount(newModeCount);
      return setPomodoroMode(newMode);
    }
    return setPomodoroMode(mode);
  };

  const handleTasksIterationChange = (data) => {
    setTasksIteration({ ...tasksIteration, ...data });
  };

  useEffect(() => {
    if (pomodoroMode === POMODORO_MODE.POMODORO && tasksIteration.isCompleted) {
      setTasksIteration({
        count: tasksIteration.count + 1,
        isCompleted: false,
      });
    }
  }, [pomodoroMode]);

  const handleFaviconChange = () => {
    const faviconPath = modes[pomodoroMode].faviconPath;

    const link = document.querySelector("link[rel~='icon']");
    link.href = faviconPath;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: getPaletteColor(pomodoroMode),
      }}
    >
      <NavigationBar />
      <HomePage
        pomodoroMode={pomodoroMode}
        handleModeChange={handleModeChange}
        tasksIteration={tasksIteration}
        handleTasksIterationChange={handleTasksIterationChange}
      />
    </Box>
  );
}

export default App;

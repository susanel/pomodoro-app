import { useState } from 'react';

import Box from '@mui/material/Box';

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage/HomePage';
import { modesOrder } from './data/data';
import { getPaletteColor } from './utils/color';

function App() {
  const [pomodoroMode, setPomodoroMode] = useState('pomodoro');
  const [modeCount, setModeCount] = useState(1);

  const handleModeChange = (mode) => {
    if (!mode) {
      const newMode = modeCount === 8 ? 1 : modeCount + 1;
      setModeCount(newMode);
      return setPomodoroMode(modesOrder[newMode - 1].type);
    }
    return setPomodoroMode(mode);
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
      />
    </Box>
  );
}

export default App;

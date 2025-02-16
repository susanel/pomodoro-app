import { useEffect } from 'react';

import Box from '@mui/material/Box';

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage/HomePage';
import { modes } from './data/data';
import { getPaletteColor } from './utils/color';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const { pomodoroMode } = useSelector((state: RootState) => state.timer);

  useEffect(() => {
    handleFaviconChange();
  }, [pomodoroMode]);

  const handleFaviconChange = () => {
    const faviconPath = modes[pomodoroMode].faviconPath;

    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    link!.href = faviconPath;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: getPaletteColor(pomodoroMode),
      }}
    >
      <NavigationBar />
      <HomePage />
    </Box>
  );
}

export default App;

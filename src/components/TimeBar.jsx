import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const TimeBar = ({ value }) => (
  <Box sx={{ width: '100%', mb: 5 }}>
    <LinearProgress variant="determinate" value={value} color="inherit" />
  </Box>
);

export default TimeBar;

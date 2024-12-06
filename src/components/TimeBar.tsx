import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface HomePageProps {
  value: number;
}

const TimeBar: React.FC<HomePageProps> = ({ value }: { value: number }) => (
  <Box sx={{ width: '100%', mb: 5 }}>
    <LinearProgress variant="determinate" value={value} color="inherit" />
  </Box>
);

export default TimeBar;

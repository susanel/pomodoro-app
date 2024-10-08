import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

const getSum = (tasks, sumType) => {
  return tasks.reduce((acc, curr) => acc + curr[sumType], 0);
};

const getFinishIn = (tasks) => {
  const timeToFinish = tasks.reduce((acc, curr) => {
    if (curr.estimatedCount > curr.actualCount)
      return acc + (curr.estimatedCount - curr.actualCount) * 25;
    return acc;
  }, 0);

  return dayjs.duration(timeToFinish, 'minutes');
};

const getFinishAt = (tasks) => {
  return dayjs().add(getFinishIn(tasks));
};

const Summary = ({ tasks }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '480px',
        mx: 'auto',
        mt: 3.5,
        py: 2.25,
        px: 1.5,
        borderTop: '1px solid white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box sx={{ mx: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
        Pomos:
        <Typography
          variant="body1"
          component="span"
          fontSize="24px"
          sx={{
            ml: 1,
            fontWeight: 700,
            color: 'rgb(255, 255, 255)',
            letterSpacing: '3px',
          }}
        >
          {getSum(tasks, 'estimatedCount')}/{getSum(tasks, 'actualCount')}
        </Typography>
      </Box>
      <Box sx={{ mx: 0.5, color: 'rgba(255, 255, 255, 0.7)' }}>
        Finish At:
        <Typography
          variant="body1"
          component="span"
          fontSize="24px"
          sx={{
            mx: 0.5,
            fontWeight: 700,
            color: 'rgb(255, 255, 255)',
          }}
        >
          {getFinishAt(tasks).format('H:m')}
        </Typography>
        ({getFinishIn(tasks).format('H:m')}h)
      </Box>
    </Box>
  );
};

export default Summary;

import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Task } from '../../data/data';

// type TaskItemProps = {
//   task: Task;
//   isActive: boolean;
//   editedTaskId: Task['id'];
//   handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void
//   handleChangeActiveTask: (taskId: Task['id']) => void
//   handleChangeEditedTask: (taskId: Task['id'] | null) => void;
// };

interface TaskItemProps {
  task: Task;
  isActive: boolean;
  editedTaskId: Task['id'];
  handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
  handleChangeActiveTask: (taskId: Task['id']) => void;
  handleChangeEditedTask: (taskId: Task['id'] | null) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  isActive,
  task,
  editedTaskId,
  handleEditTask,
  handleChangeActiveTask,
  handleChangeEditedTask,
}) => {
  const { id, title, note, actualCount, estimatedCount } = task;
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
        ...(isActive && {
          borderLeft: '6px solid rgb(34, 34, 34);',
          '&:hover': {
            borderLeft: '6px solid rgb(34, 34, 34)',
            cursor: 'pointer',
          },
        }),
      }}
      onClick={() => {
        handleChangeActiveTask(id);
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            e.stopPropagation();
            handleEditTask(id, {
              isDone: !task.isDone,
            });
          }}
        >
          <CheckCircleIcon
            fontSize="inherit"
            sx={{
              fontSize: '30px',
              color: task.isDone ? 'rgb(186, 73, 73)' : 'rgb(223, 223, 223)',
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
          onClick={(e) => {
            e.stopPropagation();
            if (editedTaskId) {
              const shouldEditAnotherTask = confirm(
                'The change will be lost. Are you sure you want to close it?'
              );
              if (!shouldEditAnotherTask) return;
            }
            handleChangeEditedTask(id);
          }}
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

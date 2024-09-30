import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Task from './Task';
import EditTask from './EditTask';

const TaskList = ({
  activeTask,
  tasks,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleChangeActiveTask,
}) => {
  const [showEditTask, setShowEditTask] = useState(false);
  const [tasksIteration, setTasksIteration] = useState(1);

  const handleShowEditTask = () => {
    setShowEditTask(!showEditTask);
  };

  return (
    <Box sx={{ width: '480px', m: '8px auto 0' }}>
      <Box>
        <Typography variant="body1" align="center" sx={{ opacity: '0.6' }}>
          #{tasksIteration}
        </Typography>
        <Typography variant="body1" fontSize="18px" align="center">
          {tasks.find((t) => t.isActive)?.title || 'Time to focus!'}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid white',
          mb: 2,
          mt: 2.5,
          pb: 1.75,
        }}
      >
        Tasks
        <IconButton variant="contained">
          <MoreIcon />
        </IconButton>
      </Box>
      {tasks.map((task) => {
        return task.type === 'display' ? (
          <Task
            isActive={task.id === activeTask?.id}
            key={task.id}
            task={task}
            handleEditTask={handleEditTask}
            handleChangeActiveTask={handleChangeActiveTask}
          />
        ) : (
          <EditTask
            key={task.id}
            task={task}
            handleAddTask={handleAddTask}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleShowEditTask={handleShowEditTask}
          />
        );
      })}
      <Box sx={{ mt: 1.5 }}>
        {!showEditTask && (
          <Button
            variant="dashed"
            sx={{ p: 0, lineHeight: '60px', width: '100%' }}
            startIcon={<AddCircleIcon fontSize="large" />}
            onClick={() => {
              handleShowEditTask();
            }}
          >
            Add Task
          </Button>
        )}
        {showEditTask && (
          <EditTask
            handleAddTask={handleAddTask}
            handleEditTask={handleEditTask}
            handleShowEditTask={handleShowEditTask}
          />
        )}
      </Box>
    </Box>
  );
};

export default TaskList;

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
  activeTaskId,
  editedTaskId,
  tasks,
  tasksIteration,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleChangeActiveTask,
  handleChangeEditedTask,
}) => {
  const [showNewTask, setShowNewTask] = useState(false);

  const handleShowNewTask = () => {
    setShowNewTask(!showNewTask);
  };

  return (
    <Box sx={{ width: '480px', m: '8px auto 0' }}>
      <Box>
        <Typography variant="body1" align="center" sx={{ opacity: '0.6' }}>
          #{tasksIteration.count}
        </Typography>
        <Typography variant="body1" fontSize="18px" align="center">
          {tasks.find((t) => t.id === activeTaskId)?.title || 'Time to focus!'}
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
        return task.id === editedTaskId ? (
          <EditTask
            key={task.id}
            task={task}
            handleAddTask={handleAddTask}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleShowNewTask={handleShowNewTask}
            handleChangeEditedTask={handleChangeEditedTask}
          />
        ) : (
          <Task
            isActive={task.id === activeTaskId}
            editedTaskId={editedTaskId}
            key={task.id}
            task={task}
            handleEditTask={handleEditTask}
            handleChangeActiveTask={handleChangeActiveTask}
            handleChangeEditedTask={handleChangeEditedTask}
          />
        );
      })}
      <Box sx={{ mt: 1.5 }}>
        {!showNewTask && (
          <Button
            variant="dashed"
            sx={{ p: 0, lineHeight: '60px', width: '100%' }}
            startIcon={<AddCircleIcon fontSize="large" />}
            onClick={() => {
              handleShowNewTask();
            }}
          >
            Add Task
          </Button>
        )}
        {showNewTask && (
          <EditTask
            handleAddTask={handleAddTask}
            handleEditTask={handleEditTask}
            handleShowNewTask={handleShowNewTask}
            handleChangeEditedTask={handleChangeEditedTask}
          />
        )}
      </Box>
    </Box>
  );
};

export default TaskList;

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';

import Timer from './Timer';
import TaskList from './TaskList';
import Summary from './Summary';
import { defaultTasks } from '../../data/data';

const HomePage = ({ pomodoroMode, handleModeChange }) => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [activeTask, setActiveTask] = useState(tasks[0] || null);

  const handleAddTask = (task) => {
    const newTask = { ...task, id: uuidv4(), type: 'display' };
    if (!tasks.length) setActiveTask(newTask);
    setTasks([...tasks, { ...newTask }]);
  };

  const handleEditTask = (taskId, data) => {
    if (data.isDone) {
      const updatedTasks = [];
      tasks.forEach((t) =>
        t.id === taskId
          ? updatedTasks.push({ ...t, ...data })
          : updatedTasks.unshift(t)
      );
      return setTasks(updatedTasks);
    }
    const newTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, ...data } : t
    );

    if (taskId === activeTask?.id) {
      setActiveTask({ ...activeTask, ...data });
    }
    return setTasks([...newTasks]);
  };

  const handleDeleteTask = (taskId) => {
    if (activeTask?.id === taskId) setActiveTask(null);
    setTasks([...tasks.filter((task) => task.id !== taskId)]);
  };

  const handleChangeActiveTask = (id) => {
    setActiveTask(tasks.find((t) => t.id === id));
  };

  return (
    <Box
      sx={{
        width: '620px',
        m: '0 auto',
      }}
    >
      <Timer
        pomodoroMode={pomodoroMode}
        handleEditTask={handleEditTask}
        handleModeChange={handleModeChange}
        activeTask={activeTask}
      />
      <TaskList
        activeTask={activeTask}
        tasks={tasks}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleChangeActiveTask={handleChangeActiveTask}
      />
      {!!tasks.length && <Summary tasks={tasks} />}
    </Box>
  );
};

export default HomePage;

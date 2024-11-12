import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';

import Timer from './Timer';
import TaskList from './TaskList';
import Summary from './Summary';
import { defaultTasks } from '../../data/data';
import { POMODORO_MODE } from '../../utils/constants';

const HomePage = ({
  pomodoroMode,
  handleModeChange,
  tasksIteration,
  handleTasksIterationChange,
}) => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [activeTaskId, setActiveTaskId] = useState(tasks[0]?.id || null);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [isCounting, setIsCounting] = useState(false);

  const handleAddTask = (task) => {
    const newTask = { ...task, id: uuidv4() };
    if (!tasks.length) setActiveTaskId(newTask.id);
    setTasks([...tasks, { ...newTask }]);
    handleChangeEditedTask(null)
  };

  const handleEditTask = (taskId, data) => {
    const newTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, ...data } : { ...t }
    );
    if (Object.hasOwn(data, 'isDone')) {
      newTasks.sort((a, b) => a.isDone - b.isDone);
    }
    return setTasks([...newTasks]);
  };

  const handleDeleteTask = (taskId) => {
    if (activeTaskId === taskId) setActiveTaskId(null);
    setTasks([...tasks.filter((task) => task.id !== taskId)]);
    handleChangeEditedTask(null)
  };

  const handleChangeActiveTask = (id) => {
    if (isCounting && pomodoroMode === POMODORO_MODE.POMODORO) {
      const shouldChangeTask = confirm(
        'The timer will be reset. Do you want to switch task?'
      );
      if (!shouldChangeTask) return;
    } else if (pomodoroMode !== POMODORO_MODE.POMODORO) {
      return setActiveTaskId(tasks.find((t) => t.id === id).id);
    }
    setIsCounting(false);
    setActiveTaskId(tasks.find((t) => t.id === id).id);
  };

  const handleChangeEditedTask = (id) => {
    return setEditedTaskId(id);
  };

  return (
    <Box
      sx={{
        width: '620px',
        m: '0 auto',
      }}
    >
      <Timer
        isCounting={isCounting}
        setIsCounting={setIsCounting}
        pomodoroMode={pomodoroMode}
        handleEditTask={handleEditTask}
        handleModeChange={handleModeChange}
        activeTask={tasks.find((t) => t.id === activeTaskId)}
        handleTasksIterationChange={handleTasksIterationChange}
      />
      <TaskList
        activeTaskId={activeTaskId}
        editedTaskId={editedTaskId}
        tasks={tasks}
        tasksIteration={tasksIteration}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleChangeActiveTask={handleChangeActiveTask}
        handleChangeEditedTask={handleChangeEditedTask}
      />
      {!!tasks.length && <Summary tasks={tasks} />}
    </Box>
  );
};

export default HomePage;

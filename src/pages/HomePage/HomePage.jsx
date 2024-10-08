import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';

import Timer from './Timer';
import TaskList from './TaskList';
import Summary from './Summary';
import { defaultTasks } from '../../data/data';
import { POMODORO_MODE, TASK_TYPE } from '../../utils/constants';

const HomePage = ({
  pomodoroMode,
  handleModeChange,
  tasksIteration,
  handleTasksIterationChange,
}) => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [activeTask, setActiveTask] = useState(tasks[0] || null);
  const [isCounting, setIsCounting] = useState(false);

  const handleAddTask = (task) => {
    const newTask = { ...task, id: uuidv4(), type: TASK_TYPE.DISPLAY };
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
    if (
      data.type === 'edit' &&
      tasks.some((t) => t.id !== taskId && t.type === 'edit')
    ) {
      const shouldEditAnotherTask = confirm(
        'The change will be lost. Are you sure you want to close it?'
      );
      if (!shouldEditAnotherTask) return;
    }
    const newTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, ...data } : { ...t, type: TASK_TYPE.DISPLAY }
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
    if (isCounting && pomodoroMode === POMODORO_MODE.POMODORO) {
      const shouldChangeTask = confirm(
        'The timer will be reset. Do you want to switch task?'
      );
      if (!shouldChangeTask) return;
    } else if (pomodoroMode !== POMODORO_MODE.POMODORO) {
      return setActiveTask(tasks.find((t) => t.id === id));
    }
    setIsCounting(false);
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
        isCounting={isCounting}
        setIsCounting={setIsCounting}
        pomodoroMode={pomodoroMode}
        handleEditTask={handleEditTask}
        handleModeChange={handleModeChange}
        activeTask={activeTask}
        handleTasksIterationChange={handleTasksIterationChange}
      />
      <TaskList
        activeTask={activeTask}
        tasks={tasks}
        tasksIteration={tasksIteration}
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

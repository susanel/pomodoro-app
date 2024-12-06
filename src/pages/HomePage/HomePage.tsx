import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';

import Timer from './Timer';
import TaskList from './TaskList';
import Summary from './Summary';
import { defaultTasks, Task } from '../../data/data';
import { POMODORO_MODE } from '../../utils/constants';
import { TaskIteration } from '../../App';

// type HomePageProps = {
//   pomodoroMode: POMODORO_MODE;
//   tasksIteration: TaskIteration;
//   handleModeChange: (mode?: POMODORO_MODE) => void;
//   handleTasksIterationChange: (data: Partial<TaskIteration>) => void;
// };

interface HomePageProps {
  pomodoroMode: POMODORO_MODE;
  tasksIteration: TaskIteration;
  handleModeChange: (mode?: POMODORO_MODE) => void;
  handleTasksIterationChange: (data: Partial<TaskIteration>) => void;
}

export type EditedTaskIdOptions = Task['id'] | 'new-task' | undefined;

const HomePage: React.FC<HomePageProps> = ({
  pomodoroMode,
  tasksIteration,
  handleModeChange,
  handleTasksIterationChange,
}) => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [activeTaskId, setActiveTaskId] = useState(tasks[0]?.id || null);
  const [editedTaskId, setEditedTaskId] =
    useState<EditedTaskIdOptions>(undefined); // 3 stany: 1. task istnieje; 2 - task nie istnieje <null? string?>,a le jest edytowany; 3 - nic nie jest edytowane <undefined>
  // czy funkcje z useState powinnam przekazywac dalej w propsach do innych komponentow czy funkcje utworzona na jej bazie?
  const [isCounting, setIsCounting] = useState(false);

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    // should have a type: NewTask? Or have an optional field on Task type?
    const newTask = { ...task, id: uuidv4() };
    if (!tasks.length) setActiveTaskId(newTask.id);
    setTasks([...tasks, { ...newTask }]);
    handleChangeEditedTask(undefined);
  };

  const handleEditTask = (taskId: Task['id'], data: Partial<Task>) => {
    // czy prefix 'handle' powinnien byc dodany do tej funkcji?
    const newTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, ...data } : { ...t }
    );
    if (Object.hasOwn(data, 'isDone')) {
      //  newTasks.sort((a, b) => a.isDone - b.isDone); // Error: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
      newTasks.sort((a, b) => Number(a.isDone) - Number(b.isDone));
    }
    setTasks([...newTasks]);
  };

  const handleDeleteTask = (taskId: Task['id']) => {
    if (activeTaskId === taskId) setActiveTaskId(null);
    setTasks([...tasks.filter((task) => task.id !== taskId)]);
    handleChangeEditedTask(undefined);
  };

  const handleChangeActiveTask = (taskId: Task['id']) => {
    // czy moge zwracac i nie zwracac czegos z funkjci?  czy jakos madrzej to przeksztalcic?
    if (isCounting && pomodoroMode === POMODORO_MODE.POMODORO) {
      const shouldChangeTask = confirm(
        'The timer will be reset. Do you want to switch task?'
      );
      if (!shouldChangeTask) return;
    } else if (pomodoroMode !== POMODORO_MODE.POMODORO) {
      setActiveTaskId(tasks.find((t) => t.id === taskId).id);
    }
    setIsCounting(false);
    setActiveTaskId(tasks.find((t) => t.id === id).id);
  };

  const handleChangeEditedTask = (taskId: EditedTaskIdOptions) => {
    setEditedTaskId(taskId);
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
        activeTask={tasks.find((t) => t.id === activeTaskId)!}
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

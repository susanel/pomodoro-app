import { defaultTasks, Task } from '../data/data';

interface TasksPayload {
  data: {
    tasks: Task[];
  };
}

// should be fetched by user, mocked for now
export const fetchTasksByUserId = async (userId: number) => {
  const response: TasksPayload = await new Promise((resolve) =>
    setTimeout(() => {
      resolve({ data: { tasks: defaultTasks } });
    }, 1000)
  );

  return response.data.tasks;
};

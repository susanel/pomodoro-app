import { RootState } from "./store";

export const selectActiveTask = (state: RootState) => {
  const activeTaskId = state.tasks.activeTaskId;
  const activeTask = activeTaskId
    ? state.tasks.tasks.find((t) => t.id === activeTaskId)
    : null;
  return {
    activeTaskId,
    activeTask,
  };
};

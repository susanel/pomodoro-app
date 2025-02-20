export const selectActiveTask = (state) => {
  const activeTaskId = state.tasks.activeTaskId;
  console.log('activeTaskId', activeTaskId);
  const activeTask = activeTaskId
    ? state.tasks.tasks.find((t) => t.id === activeTaskId)
    : null;
  return {
    activeTaskId,
    activeTask,
  };
};

import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskIdOptions, defaultTasks } from '../../data/data';

interface TasksState {
  tasks: Task[];
  activeTaskId: TaskIdOptions;
  editedTaskId: TaskIdOptions;
  taskIteration: number;
}

const initialState: TasksState = {
  tasks: [...defaultTasks],
  activeTaskId: null,
  editedTaskId: null,
  taskIteration: 1,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: uuidv4(),
        actualCount: 0,
        isCompleted: false,
      };
      if (!state.tasks.length) state.activeTaskId = newTask.id;
      state.tasks.push(newTask);
    },
    editTask: (state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...action.payload } : task
      );
      state.editedTaskId = null;
    },
    deleteTask: (state, action) => {
      if (state.activeTaskId === action.payload) state.activeTaskId = null;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.editedTaskId = null;
    },
    toggleTaskIsCompleted: (state, action) => {
      state.tasks = state.tasks
        .map((task) =>
          task.id === action.payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        )
        .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    },
    setEditedTaskId: (state, action) => {
      state.editedTaskId = action.payload;
    },
    setActiveTaskId: (state, action) => {
      state.activeTaskId = action.payload;
    },
    increaseActualCount: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        const increment = task.estimatedCount < 1 ? task.estimatedCount : 1;
        task.actualCount = task.actualCount + increment;
      }
    },
    incrementTaskIteration: (state) => {
      state.taskIteration = state.taskIteration + 1;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskIsCompleted,
  setActiveTaskId,
  setEditedTaskId,
  increaseActualCount,
  incrementTaskIteration,
} = tasksSlice.actions;

export default tasksSlice.reducer;

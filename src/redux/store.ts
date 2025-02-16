import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from '../pages/HomePage/TasksSlice';
import timerReducer from '../pages/HomePage/TimerSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer, // how to call it differentely so we don't have: state.tasks.tasks
    timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

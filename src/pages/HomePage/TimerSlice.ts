import { createSlice } from "@reduxjs/toolkit";

import { ModesOrder, modes, modesOrder } from "../../data/data";
import { POMODORO_MODE } from "../../utils/constants";

interface TimerState {
  // timer: Duration; // A non-serializable value was detected in the state, in the path: `timer.timer`.
  timer: number;
  pomodoroMode: POMODORO_MODE;
  currentModeIndex: ModesOrder["id"];
  isTimerRunning: boolean;
}

const initialState: TimerState = {
  timer: modes[POMODORO_MODE.POMODORO].duration,
  pomodoroMode: POMODORO_MODE.POMODORO,
  currentModeIndex: modesOrder[0].id,
  isTimerRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    // nie jestem pewna czy tyle roznych zmiennych stanu moge/powinnam w jednym reducerze zmieniac
    setMode: (state, action) => {
      state.isTimerRunning = false;
      state.pomodoroMode = action.payload;
    },
    setNextMode: (state) => {
      state.isTimerRunning = false;
      const nextModeIndex =
        state.currentModeIndex === 8
          ? 1
          : ((state.currentModeIndex + 1) as ModesOrder["id"]);
      const nextMode = modesOrder[nextModeIndex - 1].type;
      state.currentModeIndex = nextModeIndex;
      state.pomodoroMode = nextMode;
    },
    countDown: (state) => {
      state.timer = state.timer - 1000;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    startTimer: (state) => {
      state.isTimerRunning = true;
    },
    stopTimer: (state) => {
      state.isTimerRunning = false;
    },
  },
});

export const {
  setMode,
  setNextMode,
  startTimer,
  stopTimer,
  setTimer,
  countDown,
} = timerSlice.actions;

export default timerSlice.reducer;

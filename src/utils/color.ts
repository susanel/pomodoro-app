import { POMODORO_MODE } from "./constants";
import { modes } from "../data/data";

export const getPaletteColor = (mode: POMODORO_MODE) => {
  return modes[mode].color;
};

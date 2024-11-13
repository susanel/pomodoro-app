import { modes } from '../data/data';
import { POMODORO_MODE } from './constants';

export const getPaletteColor = (mode: POMODORO_MODE) => {
  return modes[mode].color;
};

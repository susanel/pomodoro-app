import { modes } from '../data/data';

export const getPaletteColor = (mode) => {
  return modes[mode].color;
};

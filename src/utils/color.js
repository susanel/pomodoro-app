import { modes } from "../data/data";

export const getPaletteColor = (mode) => {
  return modes.find((m) => m.type === mode).color;
};

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { v4 as uuidv4 } from 'uuid';
import { POMODORO_MODE } from '../utils/constants';

import svg_red from '../assets/favicon_red.svg';
import svg_green from '../assets/favicon_green.svg';
import svg_blue from '../assets/favicon_blue.svg';

dayjs.extend(duration);

export const defaultTasks = [
  {
    id: uuidv4(),
    title: 'Learn SQL',
    note: '',
    estimatedCount: 1,
    actualCount: 1,
    isDone: false,
  },
  {
    id: uuidv4(),
    title: 'Learn RTL',
    note: 'Test note',
    estimatedCount: 4,
    actualCount: 1,
    isDone: false,
  },
  {
    id: uuidv4(),
    title: 'Answear Email',
    note: '',
    estimatedCount: 0.1,
    actualCount: 0,
    isDone: false,
  },
];

export const modes = {
  [POMODORO_MODE.POMODORO]: {
    duration: dayjs.duration(25, 'minutes'),
    color: 'pomodoro.red',
    faviconPath: svg_red,
  },
  [POMODORO_MODE.SHORT_BREAK]: {
    duration: dayjs.duration(5, 'minutes'),
    color: 'pomodoro.green',
    faviconPath: svg_green,
  },
  [POMODORO_MODE.LONG_BREAK]: {
    duration: dayjs.duration(15, 'minutes'),
    color: 'pomodoro.blue',
    faviconPath: svg_blue,
  },
};

export const modesOrder = [
  { id: 1, type: POMODORO_MODE.POMODORO },
  { id: 2, type: POMODORO_MODE.SHORT_BREAK },
  { id: 3, type: POMODORO_MODE.POMODORO },
  { id: 4, type: POMODORO_MODE.SHORT_BREAK },
  { id: 5, type: POMODORO_MODE.POMODORO },
  { id: 6, type: POMODORO_MODE.SHORT_BREAK },
  { id: 7, type: POMODORO_MODE.POMODORO },
  { id: 8, type: POMODORO_MODE.LONG_BREAK },
];

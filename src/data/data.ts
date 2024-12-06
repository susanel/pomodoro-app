import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
import { v4 as uuidv4 } from 'uuid';
import { POMODORO_MODE } from '../utils/constants';

import svg_red from '/favicon_red.svg';
import svg_green from '/favicon_green.svg';
import svg_blue from '/favicon_blue.svg';

dayjs.extend(duration);

export interface Task {
  id: string;
  title: string;
  note: string;
  estimatedCount: number;
  actualCount: number;
  isDone: boolean;
}

export type Modes = {
  [key in POMODORO_MODE]: {
    duration: Duration;
    color: string;
    faviconPath: string;
  };
};

export const defaultTasks: Task[] = [
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

export const modes: Modes = {
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

interface ModesOrder {
  id: number;
  type: POMODORO_MODE;
}

export const modesOrder: ModesOrder[] = [
  { id: 1, type: POMODORO_MODE.POMODORO },
  { id: 2, type: POMODORO_MODE.SHORT_BREAK },
  { id: 3, type: POMODORO_MODE.POMODORO },
  { id: 4, type: POMODORO_MODE.SHORT_BREAK },
  { id: 5, type: POMODORO_MODE.POMODORO },
  { id: 6, type: POMODORO_MODE.SHORT_BREAK },
  { id: 7, type: POMODORO_MODE.POMODORO },
  { id: 8, type: POMODORO_MODE.LONG_BREAK },
];

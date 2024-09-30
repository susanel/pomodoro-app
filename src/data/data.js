import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { v4 as uuidv4 } from 'uuid';
import { POMODORO_MODE } from '../utils/constants';

dayjs.extend(duration);

export const defaultTasks = [
  // {
  //   id: uuidv4(),
  //   title: 'Learn SQL',
  //   note: '',
  //   estimatedCount: 1,
  //   actualCount: 1,
  //   isDone: false,
  //   type: 'display', //?
  // },
  // {
  //   id: uuidv4(),
  //   title: 'Learn RTL',
  //   note: 'Test note',
  //   estimatedCount: 4,
  //   actualCount: 1,
  //   isDone: false,
  //   type: 'display',
  // },
  // {
  //   id: uuidv4(),
  //   title: 'Answear Email',
  //   note: '',
  //   estimatedCount: 0.1,
  //   actualCount: 0,
  //   isDone: false,
  //   type: 'display',
  // },
];

export const modes = [
  {
    type: POMODORO_MODE.POMODORO,
    duration: dayjs.duration(25, 'minutes'),
    color: 'pomodoro.red',
  },
  {
    type: POMODORO_MODE.SHORT_BREAK,
    duration: dayjs.duration(5, 'minutes'),
    color: 'pomodoro.green',
  },
  {
    type: POMODORO_MODE.LONG_BREAK,
    duration: dayjs.duration(15, 'minutes'),
    color: 'pomodoro.blue',
  },
];

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

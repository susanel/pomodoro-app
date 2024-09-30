import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { v4 as uuidv4 } from 'uuid';

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
    type: 'pomodoro',
    duration: dayjs.duration(25, 'minutes'),
    color: 'pomodoro.red',
  },
  {
    type: 'short break',
    duration: dayjs.duration(5, 'minutes'),
    color: 'pomodoro.green',
  },
  {
    type: 'long break',
    duration: dayjs.duration(15, 'minutes'),
    color: 'pomodoro.blue',
  },
];

export const modesOrder = [
  { id: 1, type: 'pomodoro' },
  { id: 2, type: 'short break' },
  { id: 3, type: 'pomodoro' },
  { id: 4, type: 'short break' },
  { id: 5, type: 'pomodoro' },
  { id: 6, type: 'short break' },
  { id: 7, type: 'pomodoro' },
  { id: 8, type: 'long break' },
];

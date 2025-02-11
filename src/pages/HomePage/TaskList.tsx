import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';

import TaskItem from './TaskItem';
import AddTaskItem, { NewTask } from './AddTaskItem';
import EditTaskItem from './EditTaskItem';
import { Task } from '../../data/data';
import { TaskIteration } from '../../App';
import { EditedTaskIdOptions } from './HomePage';

interface TaskListProps {
  activeTaskId: Task['id'] | null;
  editedTaskId: EditedTaskIdOptions;
  tasks: Task[];
  tasksIteration: TaskIteration;
  handleAddTask: (task: NewTask) => void;
  handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
  handleDeleteTask: (taskId: Task['id']) => void;
  handleChangeActiveTask: (taskId: Task['id']) => void;
  handleChangeEditedTask: (taskId: EditedTaskIdOptions) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  activeTaskId,
  editedTaskId,
  tasks,
  tasksIteration,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleChangeActiveTask,
  handleChangeEditedTask,
}) => {
  return (
    <Box sx={{ width: '480px', m: '8px auto 0' }}>
      <Box>
        <Typography variant="body1" align="center" sx={{ opacity: '0.6' }}>
          #{tasksIteration.count}
        </Typography>
        <Typography variant="body1" fontSize="18px" align="center">
          {tasks.find((t) => t.id === activeTaskId)?.title || 'Time to focus!'}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid white',
          mb: 2,
          mt: 2.5,
          pb: 1.75,
        }}
      >
        Tasks
        <IconButton variant="contained">
          <MoreIcon />
        </IconButton>
      </Box>
      {tasks.map((task) => {
        return task.id === editedTaskId ? (
          <EditTaskItem
            key={task.id}
            task={task}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleChangeEditedTask={handleChangeEditedTask}
          />
        ) : (
          <TaskItem
            isActive={task.id === activeTaskId}
            editedTaskId={editedTaskId}
            key={task.id}
            task={task}
            handleEditTask={handleEditTask}
            handleChangeActiveTask={handleChangeActiveTask}
            handleChangeEditedTask={handleChangeEditedTask}
          />
        );
      })}
      <Box sx={{ mt: 1.5 }}>
        <AddTaskItem handleAddTask={handleAddTask} />
      </Box>
    </Box>
  );
};

export default TaskList;

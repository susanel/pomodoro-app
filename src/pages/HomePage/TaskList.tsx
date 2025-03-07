import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MoreIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddTaskItem from "./AddTaskItem";
import EditTaskItem from "./EditTaskItem";
import TaskItem from "./TaskItem";
import { fetchTasks } from "./TasksSlice";
import { AppDispatch, RootState } from "../../redux/store";

interface TaskListProps {
  // activeTaskId: Task['id'] | null;
  // editedTaskId: EditedTaskIdOptions;
  // tasks: Task[];
  // tasksIteration: TaskIteration;
  // handleAddTask: (task: NewTask) => void;
  // handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
  // handleDeleteTask: (taskId: Task['id']) => void;
  // handleChangeActiveTask: (taskId: Task['id']) => void;
  // handleChangeEditedTask: (taskId: EditedTaskIdOptions) => void;
}

const TaskList: React.FC<TaskListProps> = () => {
  const { tasks, activeTaskId, editedTaskId, taskIteration, loading } =
    useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks(1234));
  }, []);

  // Po co uzywac dispatch w [], skoro chce aby aplikacja wywolala kod jedynie raz
  // useEffect(() => {
  //   dispatch(fetchTasks(1234));
  // }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <Box sx={{ width: "480px", m: "8px auto 0" }}>
      <Box>
        <Typography variant="body1" align="center" sx={{ opacity: "0.6" }}>
          #{taskIteration}
        </Typography>
        <Typography variant="body1" fontSize="18px" align="center">
          {tasks.find((t) => t.id === activeTaskId)?.title || "Time to focus!"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid white",
          mb: 2,
          mt: 2.5,
          pb: 1.75,
        }}
      >
        {/* {Math.random()} // Dlaczego dodanie tej linijki powoduje dodanie wiecej taskow? */}
        Tasks
        <IconButton variant="contained">
          <MoreIcon />
        </IconButton>
      </Box>
      {tasks.map((task) => {
        return task.id === editedTaskId ? (
          <EditTaskItem key={task.id} task={task} />
        ) : (
          <TaskItem key={task.id} task={task} />
        );
      })}
      <Box sx={{ mt: 1.5 }}>
        <AddTaskItem />
      </Box>
    </Box>
  );
};

export default TaskList;

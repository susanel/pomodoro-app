import { useSelector } from "react-redux";

import Box from "@mui/material/Box";

import Summary from "./Summary";
import TaskList from "./TaskList";
import Timer from "./Timer";
import { RootState } from "../../redux/store";

interface HomePageProps {
  // pomodoroMode: POMODORO_MODE;
  // tasksIteration: TaskIteration;
  // handleModeChange: (mode?: POMODORO_MODE) => void;
  // handleTasksIterationChange: (data: Partial<TaskIteration>) => void;
}

const HomePage: React.FC<HomePageProps> = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <Box
      sx={{
        width: "620px",
        m: "0 auto",
      }}
    >
      <Timer />
      <TaskList />
      {!!tasks.length && <Summary />}
    </Box>
  );
};

export default HomePage;

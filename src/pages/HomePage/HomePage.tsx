import { useSelector } from "react-redux";

import Box from "@mui/material/Box";

import Summary from "./Summary";
import TaskList from "./TaskList";
import Timer from "./Timer";
import { RootState } from "../../redux/store";

const HomePage = () => {
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
      <Summary />
    </Box>
  );
};

export default HomePage;

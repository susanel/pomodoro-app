import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface HomePageProps {
  value: number;
}

const TimeBar = (props: HomePageProps) => (
  <Box sx={{ width: "100%", mb: 5 }}>
    <LinearProgress variant="determinate" value={props.value} color="inherit" />
  </Box>
);

export default TimeBar;

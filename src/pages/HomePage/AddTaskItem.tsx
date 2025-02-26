import { useId, useState } from "react";
import { useDispatch } from "react-redux";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { addTask } from "./TasksSlice";
import Form, { CreateFormData } from "../../components/Form";

const AddTaskItem = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  const dispatch = useDispatch();

  const handleAddTask = (formData: CreateFormData) => {
    const newTask = {
      title: formData.title,
      estimatedCount: formData.estimatedCount,
      note: formData.note,
    };
    dispatch(addTask(newTask));
    setShowAddTask(false);
  };

  const formId = useId();

  return (
    <>
      {showAddTask ? (
        <Card sx={{ mt: 1.5 }}>
          <CardContent>
            <Form id={formId} mode="create" handleFormData={handleAddTask} />
          </CardContent>

          <CardActions
            sx={{
              py: 1.75,
              px: 2.5,
              backgroundColor: "rgb(239, 239, 239)",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ ml: "auto" }}>
              <Button
                variant="text"
                sx={{
                  mr: 1.75,
                  py: 1,
                  flexWrap: 1,
                  color: "rgb(136, 136, 136)",
                  fontWeight: 700,
                }}
                onClick={() => setShowAddTask(false)}
              >
                Cancel
              </Button>
              <Button
                form={formId}
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "black" }}
              >
                Save
              </Button>
            </Box>
          </CardActions>
        </Card>
      ) : (
        <Button
          variant="dashed"
          sx={{ p: 0, lineHeight: "60px", width: "100%" }}
          startIcon={<AddCircleIcon fontSize="large" />}
          onClick={() => {
            setShowAddTask(true);
          }}
        >
          Add Task
        </Button>
      )}
    </>
  );
};

export default AddTaskItem;

import React, { useId, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Task } from "../../data/data";
import Form, { CreateFormData, FormConfig } from "../../components/Form";

export type NewTask = Omit<Task, "id">;

type Props = {
  handleAddTask: (task: NewTask) => void;
};


const CreateTaskItem = ({ handleAddTask }: Props) => {
  const [showCreateTask, setShowCreateTask] = useState(false);

  const handleSaveTask = (formData: CreateFormData) => {
    const newTask = {
      title: formData.title,
      estimatedCount: formData.estimatedCount,
      actualCount: 0,
      note: formData.note,
      isDone: false,
    };
    handleAddTask(newTask);
    setShowCreateTask(false);
  };

  const formId = useId();

  return (
    <>
      {showCreateTask ? (
        <Card sx={{ mt: 1.5 }}>
          <CardContent>
            <Form
              id={formId}
              mode="create"
              handleFormData={handleSaveTask}
            />
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
                onClick={() => setShowCreateTask(false)}
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
            setShowCreateTask(true);
          }}
        >
          Add Task
        </Button>
      )}
    </>
  );
};

export default CreateTaskItem;

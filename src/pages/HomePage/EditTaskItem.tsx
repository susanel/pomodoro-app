import React, { useId, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { Task } from "../../data/data";
import { EditedTaskIdOptions } from "./HomePage";
import Form, { EditFormData } from "../../components/Form";

interface EditTaskItemProps {
  task: Task;
  handleEditTask: (taskId: Task["id"], data: Partial<Task>) => void;
  handleDeleteTask: (taskId: Task["id"]) => void;
  handleChangeEditedTask: (taskId: EditedTaskIdOptions) => void;
}

const EditTaskItem: React.FC<EditTaskItemProps> = ({
  task,
  handleEditTask,
  handleDeleteTask,
  handleChangeEditedTask,
}) => {
  const handleSaveTask = (formData: EditFormData) => {
    handleEditTask(task.id, {
      title: formData.title,
      estimatedCount: formData.estimatedCount,
      actualCount: formData.actualCount,
      note: formData.note,
    });
    handleChangeEditedTask(null);
  };

  const handleCancelTask = () => {
    handleChangeEditedTask(null);
  };

  const formId = useId();

  return (
    <Card sx={{ mt: 1.5 }}>
      <CardContent>
        <Form
          id={formId}
          mode="edit"
          initialValues={task}
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
        <Button
          variant="text"
          sx={{
            py: 1,
            justifyContent: "flex-start",
            color: "rgb(136, 136, 136)",
            fontWeight: 700,
          }}
          onClick={() => handleDeleteTask(task.id)}
        >
          Delete
        </Button>

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
            onClick={() => handleCancelTask()}
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
  );
};

export default EditTaskItem;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { deleteTask, editTask, setEditedTaskId } from './TasksSlice';
import Form, { EditFormData, FormConfig } from '../../components/Form';
import { Task } from '../../data/data';

interface EditTaskItemProps {
  task: Task;
  // handleEditTask: (taskId: Task['id'], data: Partial<Task>) => void;
  // handleDeleteTask: (taskId: Task['id']) => void;
  // handleChangeEditedTask: (taskId: EditedTaskIdOptions) => void;
}

const EditTaskItem: React.FC<EditTaskItemProps> = ({ task }) => {
  const { id, title, note, estimatedCount, actualCount } = task;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<EditFormData>({
    title,
    note,
    actualCount,
    estimatedCount,
  });

  const handleSaveTask = () => {
    const editedTask = {
      id,
      title: formData.title,
      estimatedCount: formData.estimatedCount,
      actualCount: formData.actualCount,
      note: formData.note,
    };
    dispatch(editTask(editedTask));
  };

  const handleCancelTask = () => {
    dispatch(setEditedTaskId(null));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const formConfig: FormConfig = {
    formData,
    mode: 'edit',
  };

  const handleFormData = (newState: Partial<EditFormData>) => {
    setFormData((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <Card sx={{ mt: 1.5 }}>
      <CardContent>
        <Form config={formConfig} handleFormData={handleFormData} />
      </CardContent>

      <CardActions
        sx={{
          py: 1.75,
          px: 2.5,
          backgroundColor: 'rgb(239, 239, 239)',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="text"
          sx={{
            py: 1,
            justifyContent: 'flex-start',
            color: 'rgb(136, 136, 136)',
            fontWeight: 700,
          }}
          onClick={() => handleDeleteTask()}
        >
          Delete
        </Button>

        <Box sx={{ ml: 'auto' }}>
          <Button
            variant="text"
            sx={{
              mr: 1.75,
              py: 1,
              flexWrap: 1,
              color: 'rgb(136, 136, 136)',
              fontWeight: 700,
            }}
            onClick={() => handleCancelTask()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'black' }}
            onClick={() => handleSaveTask()}
          >
            Save
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default EditTaskItem;

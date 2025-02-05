import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { Task } from '../../data/data';
import { EditedTaskIdOptions } from './HomePage';
import Form, { CreateFormData, FormConfig } from '../../components/Form';

interface CreateTaskItemProps {
  handleAddTask: (task: Omit<Task, 'id'>) => void;
  handleChangeEditedTask: (taskId: EditedTaskIdOptions) => void;
}

const CreateTaskItem: React.FC<CreateTaskItemProps> = ({
  handleAddTask,
  handleChangeEditedTask,
}) => {
  const [formData, setFormData] = useState<CreateFormData>({
    title: '',
    note: '',
    estimatedCount: 1,
  });

  const handleSaveTask = () => {
    const newTask = {
      title: formData.title,
      estimatedCount: formData.estimatedCount,
      actualCount: 0,
      note: formData.note,
      isDone: false,
    };
    handleAddTask(newTask);
    handleChangeEditedTask(undefined);
  };

  const handleFormData = (newState: Partial<CreateFormData>) => {
    setFormData((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleCancelTask = () => {
    return handleChangeEditedTask(undefined);
  };

  const formConfig: FormConfig = {
    formData,
    mode: 'create',
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

export default CreateTaskItem;

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Task } from '../../data/data';
import Form, { CreateFormData, FormConfig } from '../../components/Form';

export type NewTask = Omit<Task, 'id'>;

interface AddTaskItemProps {
  handleAddTask: (task: NewTask) => void;
}

const AddTaskItem: React.FC<AddTaskItemProps> = ({ handleAddTask }) => {
  const [showAddTask, setShowAddTask] = useState(false);
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
    setShowAddTask(false);
  };

  const handleFormData = (newState: Partial<CreateFormData>) => {
    setFormData((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const formConfig: FormConfig = {
    formData,
    mode: 'create',
  };

  return (
    <>
      {showAddTask ? (
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
                onClick={() => setShowAddTask(false)}
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
      ) : (
        <Button
          variant="dashed"
          sx={{ p: 0, lineHeight: '60px', width: '100%' }}
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

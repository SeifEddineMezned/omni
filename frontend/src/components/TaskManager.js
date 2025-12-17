import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Chip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Assignment,
  Flag,
} from '@mui/icons-material';
import { format } from 'date-fns';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete project documentation',
      description: 'Finish writing the user manual and API documentation',
      priority: 'high',
      completed: false,
      dueDate: '2024-01-15',
      category: 'Work',
    },
    {
      id: 2,
      title: 'Buy groceries',
      description: 'Weekly grocery shopping - milk, bread, fruits',
      priority: 'medium',
      completed: true,
      dueDate: '2024-01-10',
      category: 'Personal',
    },
    {
      id: 3,
      title: 'Exercise routine',
      description: '30 minutes cardio workout',
      priority: 'medium',
      completed: false,
      dueDate: '2024-01-12',
      category: 'Health',
    },
    {
      id: 4,
      title: 'Call dentist',
      description: 'Schedule appointment for dental checkup',
      priority: 'low',
      completed: false,
      dueDate: '2024-01-20',
      category: 'Health',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'Personal',
  });

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
    });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? { ...task, ...formData } : task
      ));
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      category: 'Personal',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'high':
        return tasks.filter(task => task.priority === 'high');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Assignment sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Task Manager
        </Typography>
      </Box>

      {/* Filter Buttons */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => setFilter('all')}
          sx={{ mr: 1 }}
        >
          All ({tasks.length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'contained' : 'outlined'}
          onClick={() => setFilter('pending')}
          sx={{ mr: 1 }}
        >
          Pending ({tasks.filter(t => !t.completed).length})
        </Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => setFilter('completed')}
          sx={{ mr: 1 }}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </Button>
        <Button
          variant={filter === 'high' ? 'contained' : 'outlined'}
          onClick={() => setFilter('high')}
        >
          High Priority ({tasks.filter(t => t.priority === 'high').length})
        </Button>
      </Box>

      {/* Tasks List */}
      <Card>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No tasks found
            </Typography>
          ) : (
            <List>
              {filteredTasks.map((task) => (
                <ListItem key={task.id} divider>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    sx={{ mr: 2 }}
                  />
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.7 : 1,
                          }}
                        >
                          {task.title}
                        </Typography>
                        <Chip
                          size="small"
                          label={task.priority}
                          color={getPriorityColor(task.priority)}
                          icon={<Flag />}
                        />
                        <Chip
                          size="small"
                          label={task.category}
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {task.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => handleEditTask(task)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteTask(task.id)}
                      size="small"
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Add Task FAB */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Fab>

      {/* Add/Edit Task Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Learning">Learning</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.title.trim()}
          >
            {editingTask ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskManager;

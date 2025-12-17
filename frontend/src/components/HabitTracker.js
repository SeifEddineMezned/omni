import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  FitnessCenter,
  CheckCircle,
  RadioButtonUnchecked,
  Whatshot,
  CalendarToday,
} from '@mui/icons-material';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Morning Exercise',
      description: '30 minutes of physical activity',
      category: 'Health',
      target: 7, // times per week
      color: '#4caf50',
      streak: 5,
      completions: {
        '2024-01-08': true,
        '2024-01-09': true,
        '2024-01-10': true,
        '2024-01-11': true,
        '2024-01-12': true,
      },
    },
    {
      id: 2,
      name: 'Read Books',
      description: 'Read for at least 20 minutes',
      category: 'Learning',
      target: 5,
      color: '#2196f3',
      streak: 12,
      completions: {
        '2024-01-08': true,
        '2024-01-09': false,
        '2024-01-10': true,
        '2024-01-11': true,
        '2024-01-12': true,
      },
    },
    {
      id: 3,
      name: 'Drink Water',
      description: 'Drink at least 8 glasses of water',
      category: 'Health',
      target: 7,
      color: '#00bcd4',
      streak: 3,
      completions: {
        '2024-01-10': true,
        '2024-01-11': true,
        '2024-01-12': true,
      },
    },
    {
      id: 4,
      name: 'Meditation',
      description: '10 minutes of mindfulness meditation',
      category: 'Mindfulness',
      target: 7,
      color: '#9c27b0',
      streak: 8,
      completions: {
        '2024-01-08': true,
        '2024-01-09': true,
        '2024-01-10': false,
        '2024-01-11': true,
        '2024-01-12': true,
      },
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Health',
    target: 7,
    color: '#4caf50',
  });

  const getCurrentWeek = () => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const currentWeek = getCurrentWeek();

  const toggleHabitCompletion = (habitId, date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompletions = {
          ...habit.completions,
          [dateStr]: !habit.completions[dateStr],
        };
        
        // Recalculate streak
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 30; i++) {
          const checkDate = format(addDays(today, -i), 'yyyy-MM-dd');
          if (newCompletions[checkDate]) {
            streak++;
          } else {
            break;
          }
        }
        
        return {
          ...habit,
          completions: newCompletions,
          streak,
        };
      }
      return habit;
    }));
  };

  const getWeeklyProgress = (habit) => {
    const completed = currentWeek.filter(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return habit.completions[dateStr];
    }).length;
    return (completed / habit.target) * 100;
  };

  const handleAddHabit = () => {
    const newHabit = {
      ...formData,
      id: Date.now(),
      streak: 0,
      completions: {},
    };
    setHabits([...habits, newHabit]);
    handleClose();
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setFormData({
      name: habit.name,
      description: habit.description,
      category: habit.category,
      target: habit.target,
      color: habit.color,
    });
    setOpen(true);
  };

  const handleUpdateHabit = () => {
    setHabits(habits.map(habit => 
      habit.id === editingHabit.id ? { ...habit, ...formData } : habit
    ));
    handleClose();
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingHabit(null);
    setFormData({
      name: '',
      description: '',
      category: 'Health',
      target: 7,
      color: '#4caf50',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FitnessCenter sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Habit Tracker
        </Typography>
      </Box>

      {/* Week Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Week of {format(currentWeek[0], 'MMM dd')} - {format(currentWeek[6], 'MMM dd, yyyy')}
          </Typography>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {currentWeek.map((date) => (
              <Grid item xs key={date.toString()}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" display="block">
                    {format(date, 'EEE')}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: isSameDay(date, new Date()) ? 'bold' : 'normal',
                      color: isSameDay(date, new Date()) ? 'primary.main' : 'inherit',
                    }}
                  >
                    {format(date, 'dd')}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Habits List */}
      <Grid container spacing={3}>
        {habits.map((habit) => {
          const progress = getWeeklyProgress(habit);
          const completed = currentWeek.filter(date => {
            const dateStr = format(date, 'yyyy-MM-dd');
            return habit.completions[dateStr];
          }).length;

          return (
            <Grid item xs={12} key={habit.id}>
              <Card sx={{ borderLeft: `4px solid ${habit.color}` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {habit.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {habit.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                        <Chip 
                          size="small" 
                          label={habit.category} 
                          variant="outlined"
                        />
                        <Chip 
                          size="small" 
                          label={`${habit.streak} day streak`} 
                          icon={<Whatshot />}
                          color="warning"
                        />
                        <Chip 
                          size="small" 
                          label={`${completed}/${habit.target} this week`}
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Box>
                      <IconButton 
                        onClick={() => handleEditHabit(habit)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteHabit(habit.id)}
                        size="small"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Progress Bar */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Weekly Progress</Typography>
                      <Typography variant="body2">{Math.round(progress)}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: habit.color,
                        },
                      }} 
                    />
                  </Box>

                  {/* Daily Checkboxes */}
                  <Grid container spacing={1}>
                    {currentWeek.map((date) => {
                      const dateStr = format(date, 'yyyy-MM-dd');
                      const isCompleted = habit.completions[dateStr];
                      const isToday = isSameDay(date, new Date());
                      const isFuture = date > new Date();

                      return (
                        <Grid item xs key={date.toString()}>
                          <Box sx={{ textAlign: 'center' }}>
                            <IconButton
                              onClick={() => toggleHabitCompletion(habit.id, date)}
                              disabled={isFuture}
                              sx={{
                                color: isCompleted ? habit.color : 'action.disabled',
                                border: isToday ? '2px solid' : 'none',
                                borderColor: 'primary.main',
                                '&:hover': {
                                  backgroundColor: 'action.hover',
                                },
                              }}
                            >
                              {isCompleted ? <CheckCircle /> : <RadioButtonUnchecked />}
                            </IconButton>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Add Habit FAB */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Fab>

      {/* Add/Edit Habit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingHabit ? 'Edit Habit' : 'Add New Habit'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Habit Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Learning">Learning</MenuItem>
                  <MenuItem value="Productivity">Productivity</MenuItem>
                  <MenuItem value="Mindfulness">Mindfulness</MenuItem>
                  <MenuItem value="Social">Social</MenuItem>
                  <MenuItem value="Creative">Creative</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Weekly Target"
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) || 1 })}
                inputProps={{ min: 1, max: 7 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={editingHabit ? handleUpdateHabit : handleAddHabit} 
            variant="contained"
            disabled={!formData.name.trim()}
          >
            {editingHabit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HabitTracker;

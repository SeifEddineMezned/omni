import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  EmojiEvents,
  CheckCircle,
  Schedule,
  TrendingUp,
  Edit,
  Delete,
} from '@mui/icons-material';
import { format, differenceInDays } from 'date-fns';

const GoalManager = () => {
  const [goals] = useState([
    {
      id: 1,
      title: 'Learn React Development',
      description: 'Complete a comprehensive React course and build 3 projects',
      category: 'Learning',
      progress: 65,
      startDate: '2024-01-01',
      targetDate: '2024-03-01',
      status: 'in-progress',
      milestones: [
        { id: 1, title: 'Complete basic React tutorial', completed: true },
        { id: 2, title: 'Build todo app', completed: true },
        { id: 3, title: 'Learn React Router', completed: false },
        { id: 4, title: 'Build portfolio website', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Save $10,000',
      description: 'Emergency fund savings goal for financial security',
      category: 'Finance',
      progress: 40,
      startDate: '2023-06-01',
      targetDate: '2024-06-01',
      status: 'in-progress',
      milestones: [
        { id: 1, title: 'Save first $2,500', completed: true },
        { id: 2, title: 'Reach $5,000 milestone', completed: false },
        { id: 3, title: 'Achieve $7,500', completed: false },
        { id: 4, title: 'Complete $10,000 goal', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Run a Half Marathon',
      description: 'Complete a 21km half marathon race',
      category: 'Health',
      progress: 20,
      startDate: '2024-01-01',
      targetDate: '2024-05-01',
      status: 'in-progress',
      milestones: [
        { id: 1, title: 'Run 5km without stopping', completed: true },
        { id: 2, title: 'Complete 10km run', completed: false },
        { id: 3, title: 'Run 15km training', completed: false },
        { id: 4, title: 'Complete half marathon', completed: false },
      ],
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'paused': return 'warning';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Learning': return '#2196f3';
      case 'Finance': return '#4caf50';
      case 'Health': return '#ff9800';
      case 'Career': return '#9c27b0';
      default: return '#757575';
    }
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    return differenceInDays(target, today);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <EmojiEvents sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Goal Manager
        </Typography>
      </Box>

      {/* Goals Overview */}
      <Grid container spacing={3}>
        {goals.map((goal) => {
          const daysRemaining = getDaysRemaining(goal.targetDate);
          const completedMilestones = goal.milestones.filter(m => m.completed).length;
          const totalMilestones = goal.milestones.length;

          return (
            <Grid item xs={12} md={6} lg={4} key={goal.id}>
              <Card sx={{ height: '100%', borderLeft: `4px solid ${getCategoryColor(goal.category)}` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {goal.title}
                    </Typography>
                    <Box>
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {goal.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      size="small" 
                      label={goal.category}
                      sx={{ backgroundColor: getCategoryColor(goal.category), color: 'white' }}
                    />
                    <Chip 
                      size="small" 
                      label={goal.status}
                      color={getStatusColor(goal.status)}
                      variant="outlined"
                    />
                  </Box>

                  {/* Progress */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2">{goal.progress}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={goal.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  {/* Milestones */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Milestones ({completedMilestones}/{totalMilestones})
                    </Typography>
                    <List dense>
                      {goal.milestones.slice(0, 3).map((milestone) => (
                        <ListItem key={milestone.id} sx={{ px: 0, py: 0.5 }}>
                          <CheckCircle 
                            sx={{ 
                              mr: 1, 
                              fontSize: 16,
                              color: milestone.completed ? 'success.main' : 'action.disabled'
                            }} 
                          />
                          <ListItemText 
                            primary={
                              <Typography 
                                variant="body2"
                                sx={{
                                  textDecoration: milestone.completed ? 'line-through' : 'none',
                                  opacity: milestone.completed ? 0.7 : 1,
                                }}
                              >
                                {milestone.title}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Timeline */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Schedule sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Due: {format(new Date(goal.targetDate), 'MMM dd, yyyy')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <CardContent>
              <TrendingUp sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4">{goals.length}</Typography>
              <Typography variant="h6">Active Goals</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
            <CardContent>
              <CheckCircle sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4">0</Typography>
              <Typography variant="h6">Completed Goals</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', bgcolor: 'info.light', color: 'info.contrastText' }}>
            <CardContent>
              <EmojiEvents sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4">
                {Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)}%
              </Typography>
              <Typography variant="h6">Average Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GoalManager;

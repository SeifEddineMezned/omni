import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  FitnessCenter,
  AttachMoney,
  EmojiEvents,
  Today,
} from '@mui/icons-material';
import { format } from 'date-fns';

const Dashboard = () => {
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    totalTasks: 0,
    habitsStreak: 0,
    goalsAchieved: 0,
    totalGoals: 0,
    monthlyBudget: 0,
    monthlySpent: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    // Load dashboard data from localStorage or API
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Mock data - replace with actual API calls
    const mockStats = {
      tasksCompleted: 12,
      totalTasks: 18,
      habitsStreak: 7,
      goalsAchieved: 3,
      totalGoals: 8,
      monthlyBudget: 3000,
      monthlySpent: 1850,
    };

    const mockActivities = [
      { id: 1, type: 'task', title: 'Completed morning workout', time: '8:30 AM' },
      { id: 2, type: 'habit', title: 'Read for 30 minutes', time: '9:15 AM' },
      { id: 3, type: 'goal', title: 'Reached savings target', time: '10:00 AM' },
      { id: 4, type: 'finance', title: 'Added expense: Groceries $85', time: '11:30 AM' },
    ];

    const mockUpcoming = [
      { id: 1, title: 'Team meeting', priority: 'high', dueTime: '2:00 PM' },
      { id: 2, title: 'Grocery shopping', priority: 'medium', dueTime: '4:00 PM' },
      { id: 3, title: 'Call dentist', priority: 'low', dueTime: 'Tomorrow' },
    ];

    setStats(mockStats);
    setRecentActivities(mockActivities);
    setUpcomingTasks(mockUpcoming);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task': return <Assignment color="primary" />;
      case 'habit': return <FitnessCenter color="secondary" />;
      case 'goal': return <EmojiEvents color="warning" />;
      case 'finance': return <AttachMoney color="success" />;
      default: return <Today />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const taskCompletionRate = stats.totalTasks > 0 ? (stats.tasksCompleted / stats.totalTasks) * 100 : 0;
  const goalCompletionRate = stats.totalGoals > 0 ? (stats.goalsAchieved / stats.totalGoals) * 100 : 0;
  const budgetUsageRate = stats.monthlyBudget > 0 ? (stats.monthlySpent / stats.monthlyBudget) * 100 : 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Welcome back! Here's your life overview for {format(new Date(), 'MMMM do, yyyy')}
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Tasks Today
                  </Typography>
                  <Typography variant="h4">
                    {stats.tasksCompleted}/{stats.totalTasks}
                  </Typography>
                </Box>
                <Assignment color="primary" sx={{ fontSize: 40 }} />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={taskCompletionRate} 
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Habit Streak
                  </Typography>
                  <Typography variant="h4">
                    {stats.habitsStreak} days
                  </Typography>
                </Box>
                <FitnessCenter color="secondary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Goals Progress
                  </Typography>
                  <Typography variant="h4">
                    {stats.goalsAchieved}/{stats.totalGoals}
                  </Typography>
                </Box>
                <EmojiEvents color="warning" sx={{ fontSize: 40 }} />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={goalCompletionRate} 
                color="warning"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Budget Used
                  </Typography>
                  <Typography variant="h6">
                    ${stats.monthlySpent}/${stats.monthlyBudget}
                  </Typography>
                </Box>
                <AttachMoney color="success" sx={{ fontSize: 40 }} />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={budgetUsageRate} 
                color={budgetUsageRate > 80 ? 'error' : 'success'}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id} disableGutters>
                  <Avatar sx={{ mr: 2 }}>
                    {getActivityIcon(activity.type)}
                  </Avatar>
                  <ListItemText
                    primary={activity.title}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Tasks
            </Typography>
            <List>
              {upcomingTasks.map((task) => (
                <ListItem key={task.id} disableGutters>
                  <ListItemText
                    primary={task.title}
                    secondary={task.dueTime}
                  />
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              View All Tasks
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

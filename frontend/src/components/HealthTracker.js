import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Favorite,
  FitnessCenter,
  LocalDining,
  Bedtime,
  MonitorWeight,
} from '@mui/icons-material';

const HealthTracker = () => {
  const healthMetrics = [
    {
      title: 'Steps Today',
      value: 8420,
      target: 10000,
      unit: 'steps',
      icon: <FitnessCenter />,
      color: 'primary',
    },
    {
      title: 'Water Intake',
      value: 6,
      target: 8,
      unit: 'glasses',
      icon: <LocalDining />,
      color: 'info',
    },
    {
      title: 'Sleep',
      value: 7.5,
      target: 8,
      unit: 'hours',
      icon: <Bedtime />,
      color: 'secondary',
    },
    {
      title: 'Weight',
      value: 72,
      target: 70,
      unit: 'kg',
      icon: <MonitorWeight />,
      color: 'warning',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Favorite sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Health Tracker
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {healthMetrics.map((metric) => {
          const progress = (metric.value / metric.target) * 100;
          return (
            <Grid item xs={12} sm={6} md={3} key={metric.title}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {metric.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {metric.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4" gutterBottom>
                    {metric.value} <Typography component="span" variant="body1">{metric.unit}</Typography>
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(progress, 100)}
                      color={metric.color}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Target: {metric.target} {metric.unit}
                  </Typography>
                  <Chip 
                    size="small" 
                    label={`${Math.round(progress)}%`}
                    color={progress >= 100 ? 'success' : 'default'}
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Health Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your daily health metrics and build better habits. Set targets for steps, water intake, 
            sleep, and weight management. Your health journey starts with small, consistent actions!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HealthTracker;

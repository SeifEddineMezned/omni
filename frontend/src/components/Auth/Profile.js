import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
} from '@mui/material';
import { Person, Email, DateRange, Star } from '@mui/icons-material';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const stats = [
    { label: 'Tasks Completed', value: 125, icon: '✅' },
    { label: 'Habits Tracked', value: 15, icon: '🎯' },
    { label: 'Goals Achieved', value: 8, icon: '🏆' },
    { label: 'Days Active', value: 45, icon: '📅' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Person sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Profile
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* User Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}
              >
                {user.name?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user.name || 'Demo User'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2" color="text.secondary">
                  {user.email || 'demo@example.com'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <DateRange sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2" color="text.secondary">
                  Member since January 2024
                </Typography>
              </Box>
              <Chip 
                icon={<Star />}
                label="Pro User"
                color="primary"
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Stats */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ mb: 1 }}>
                      {stat.icon}
                    </Typography>
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Achievements
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="🔥 7-day streak!" color="warning" />
                <Chip label="💰 Budget on track" color="success" />
                <Chip label="📚 Book finished" color="primary" />
                <Chip label="🏃‍♂️ 10k steps goal" color="info" />
                <Chip label="✅ Week completed" color="secondary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;

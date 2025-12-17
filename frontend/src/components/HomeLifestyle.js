import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Home } from '@mui/icons-material';

const HomeLifestyle = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Home sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Home & Lifestyle
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Coming Soon!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your home, lifestyle, and personal interests all in one place.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomeLifestyle;

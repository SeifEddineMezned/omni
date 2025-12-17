import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Analytics as AnalyticsIcon } from '@mui/icons-material';

const Analytics = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AnalyticsIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Analytics
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Life Insights & Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visualize your progress, trends, and patterns across all life areas with detailed analytics and reports.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Analytics;

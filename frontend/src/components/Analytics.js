import React from 'react';
import { Box, Typography } from '@mui/material';
import { Analytics as AnalyticsIcon } from '@mui/icons-material';
import './analyticsLoader.css';

const Analytics = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AnalyticsIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Analytics
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <span className="bar bar1" style={{ width: '12px', height: '100px' }} />
          <span className="bar bar2" style={{ width: '12px', height: '100px' }} />
          <span className="bar bar3" style={{ width: '12px', height: '100px' }} />
          <span className="bar bar4" style={{ width: '12px', height: '100px' }} />
          <span className="bar bar5" style={{ width: '12px', height: '100px' }} />
          <span className="bar bar6" style={{ width: '12px', height: '100px' }} />
          <span className="bar bar7" style={{ width: '12px', height: '100px' }} />
          <span className="bar bar8" style={{ width: '12px', height: '100px' }} />
        </div>
      </Box>
    </Box>
  );
};

export default Analytics;

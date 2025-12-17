import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { MenuBook } from '@mui/icons-material';

const KnowledgeBase = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MenuBook sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Knowledge Base
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Personal Wiki
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Store notes, articles, ideas, and learnings. Build your personal knowledge repository.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default KnowledgeBase;

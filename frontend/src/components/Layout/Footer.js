import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © 2025 OMNI
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        <Link color="inherit" href="#" underline="hover">
          Privacy Policy
        </Link>
        {' • '}
        <Link color="inherit" href="#" underline="hover">
          Terms of Service
        </Link>
        {' • '}
        <Link color="inherit" href="#" underline="hover">
          Support
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;

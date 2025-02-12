import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box } from '@mui/material';

const LandingPage = () => {
  return (
    <div>
        <Box textAlign="center" my={20}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Gainz
          </Typography>
          <Typography variant="h5" component="h2" paragraph>
            A smarter way to track your progress.
          </Typography>
          <Button variant="contained" color="primary" size="large" style={{ marginRight: '10px' }} component={Link} to="/login">
            Log In
          </Button>
          <Button variant="outlined" color="primary" size="large" component={Link} to="/register">
            Register
          </Button>
        </Box>
    </div>
  );
};

export default LandingPage;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { validateCookies } from '../js/Cookies';
import HomeBar from '../components/home/HomeBar';
import WorkoutFeed from '../components/home/WorkoutFeed';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (validateCookies() == false) {
      navigate('/login');
    }
  }, []);

  return (
    <Container sx={{ alignItems: 'center' }}>
      <HomeBar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          // height: 'calc(100vh - 70px)',
          // textAlign: 'center',
          width: '100%',
          // m: 5
        }}
      >
        <Typography textAlign="center" variant='h5' sx={{ m: 3, fontWeight: "bold" }}>My Feed</Typography>
        <WorkoutFeed />
        <Typography textAlign="center" sx={{ m: 10 }}>No more feed to show!</Typography>
      </Box>

    </Container>
  );
};

export default HomePage;
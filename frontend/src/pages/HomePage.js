import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie === '') {
      navigate('/login');
    }
  });

  const createWorkout = () => {

  };

  const deleteUserCookies = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const logOut = () => {
    deleteUserCookies();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Workout Tracker!
      </Typography>

      <Typography variant="body1" gutterBottom>
        Manage your workouts, track your progress, and stay motivated!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={createWorkout}
        style={{ marginRight: '10px' }}
      >
        Create New Workout
      </Button>

      <Button variant="outlined" color="secondary" onClick={logOut}>
        Log out
      </Button>
    </Container>
  );
};

export default HomePage;
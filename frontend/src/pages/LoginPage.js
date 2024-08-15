import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [alertMessage, setAlertMessage] = useState('Invalid Username/Password!');
  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie !== '') {
      navigate('/home');
    }
  });

  const setUserCookies = (data) => {
    let now = new Date();
    now.setTime(now.getTime() + (60 * 60 * 1000));
    document.cookie = `username=${data.username};expires=${now.toUTCString()};path=/;SameSite=Strict`;
    document.cookie = `id=${data.id};expires=${now.toUTCString()};path=/;SameSite=Strict`;
    document.cookie = `email=${data.email};expires=${now.toUTCString()};path=/;SameSite=Strict`;
    document.cookie = `name=${data.firstName} ${data.lastName};expires=${now.toUTCString()};path=/;SameSite=Strict`;
  };

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    });

    if (response.ok) {
      const data = await response.json();
      setUserCookies(data);
      setAlertType('success');
      setAlertMessage('Success! Logging in...');
      setShowAlert(true);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '30px', marginTop: '50px' }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1">
            Login
          </Typography>
        </Box>
        {showAlert && (
          <Alert severity={alertType} >{alertMessage}</Alert>
        )}
        <Box mb={3}>
          <TextField
            label="Username"
            type="username"
            fullWidth
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (showAlert) {
                setShowAlert(false);
              }
            }}
            margin="normal"
            variant="outlined"
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (showAlert) {
                setShowAlert(false);
              }
            }}
            margin="normal"
            variant="outlined"
          />
        </Box>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ marginRight: '10px' }}
          >
            Login
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/">
            Cancel
          </Button>
        </Box>
        <Box textAlign="center">
          <Typography textAlign="center" component={Link} to="/register">Don't have an account? Create Account</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
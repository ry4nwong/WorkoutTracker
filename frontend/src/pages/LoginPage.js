import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { setUserCookies, validateCookies } from '../utils/Cookies';

const LoginPage = ({ setDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [alertMessage, setAlertMessage] = useState('Invalid Username/Password!');
  const navigate = useNavigate();

  useEffect(() => {
    if (validateCookies() === true) {
      navigate('/home');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation Login($loginInput: LoginInput!) {
            login(loginInput: $loginInput) {
              id
              darkMode
            }
          }
        `,
        variables: {
          loginInput: {
            username: username,
            password: password,
          },
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const userData = data?.data?.login;

      if (userData) {
        setUserCookies(userData);
        setAlertType('success');
        setAlertMessage('Success! Logging in...');
        setShowAlert(true);
        setTimeout(() => {
          navigate('/home');
          setDarkMode(userData.darkMode);
        }, 2000);
      } else {
        setShowAlert(true);
      }
    } else {
      setAlertType('error');
      setAlertMessage('An error occurred. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '30px', marginTop: '50px' }}>
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
        <Box textAlign="center" sx={{ margin: 2 }}>
          <Typography textAlign="center" component={Link} to="/register">Don't have an account? Create Account</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
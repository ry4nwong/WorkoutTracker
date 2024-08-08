import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [alertMessage, setAlertMessage] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: username.toLowerCase(), 
                email: email.toLowerCase(), 
                password: password, 
                firstName: firstName, 
                lastName: lastName 
            })
        });

        if (response.ok) {
            const data = await response.json();
            setAlertMessage('Registration successful!');
            setAlertType('success')
            setShowAlert(true);
        } else {
            setShowAlert(true);
            setAlertMessage(await response.body());
        }

    };

    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}
            component="form"
            onSubmit={handleRegister}
        >
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            {showAlert && (
                <Alert severity={alertType} >{alertMessage}</Alert>
            )}
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    if(e.target.value === '') {
                        setUsernameError(true);
                        setUsernameErrorMessage('Username Required!');
                    } else if(/^[a-zA-Z0-9]+$/.test(e.target.value) == false) {
                        setUsernameError(true);
                        setUsernameErrorMessage('Username must only include letters (A-Z) and numbers (0-9)!');
                    } else {
                        setUsernameError(false);
                        setUsernameErrorMessage('');
                    }
                }}
                margin="normal"
                fullWidth
                error={usernameError}
                helperText={usernameErrorMessage}
                required
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if(e.target.value === '') {
                        setEmailError(true);
                        setEmailErrorMessage('Email Required!');
                    } else if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value) == false) {
                        setEmailError(true);
                        setEmailErrorMessage('Enter a valid email!');
                    } else {
                        setEmailError(false);
                        setEmailErrorMessage('');
                    }
                }}
                margin="normal"
                fullWidth
                error={emailError}
                helperText={emailErrorMessage}
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if(e.target.value === '') {
                        setPasswordError(true);
                        setPasswordErrorMessage('Password Required!')
                    } else {
                        setPasswordError(false);
                        setPasswordErrorMessage('');
                    }
                }}
                margin="normal"
                fullWidth
                error={passwordError}
                helperText={passwordErrorMessage}
                required
            />
            <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if(e.target.value === '' || e.target.value !== password) {
                        setConfirmPasswordError(true);
                        setConfirmPasswordErrorMessage('Passwords must match!')
                    } else {
                        setConfirmPasswordError(false);
                        setConfirmPasswordErrorMessage('');
                    }
                }}
                margin="normal"
                fullWidth
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                required
            />
            <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                margin="normal"
                fullWidth
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={usernameError || emailError || passwordError || confirmPasswordError}
            >
                Register
            </Button>
        </Box>
    );
};

export default RegistrationPage;
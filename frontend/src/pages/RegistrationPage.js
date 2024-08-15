import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import UsernameInput from '../components/registration/UsernameInput';
import PasswordInput from '../components/registration/PasswordInput';
import EmailInput from '../components/registration/EmailInput';
import ConfirmPasswordInput from '../components/registration/ConfirmPasswordInput';
import NameInput from '../components/registration/NameInput';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const setUserCookies = (data) => {
        let now = new Date();
        now.setTime(now.getTime() + (60 * 60 * 1000));
        document.cookie = `username=${data.username};expires=${now.toUTCString()};path=/;SameSite=Strict`;
        document.cookie = `id=${data.id};expires=${now.toUTCString()};path=/;SameSite=Strict`;
        document.cookie = `email=${data.email};expires=${now.toUTCString()};path=/;SameSite=Strict`;
        document.cookie = `name=${data.firstName} ${data.lastName};expires=${now.toUTCString()};path=/;SameSite=Strict`;
      };

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
            setAlertType('success');
            setShowAlert(true);
            setUserCookies(data);
            setTimeout(() => {
                navigate('/home');
              }, 1000);
        } else {
            setAlertMessage('Registration failed!');
            setAlertType('error');
            setShowAlert(true);
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
            <UsernameInput sendUsername={setUsername} sendUsernameError={setUsernameError} />
            <EmailInput sendEmail={setEmail} sendEmailError={setEmailError} />
            <PasswordInput sendPassword={setPassword} currentConfirmPassword={confirmPassword} sendPasswordError={setPasswordError} />
            <ConfirmPasswordInput sendConfirmPassword={setConfirmPassword} currentPassword={password} sendConfirmPasswordError={setConfirmPasswordError}/>
            <NameInput nameType="First Name" setName={setFirstName} />
            <NameInput nameType="Last Name" setName={setLastName} />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={usernameError || emailError || passwordError || confirmPasswordError
                    || username === '' || email === '' || password === '' || confirmPassword === ''}
            >
                Register
            </Button>
        </Box>
    );
};

export default RegistrationPage;
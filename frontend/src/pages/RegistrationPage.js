import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import UsernameInput from '../components/registration/UsernameInput';
import PasswordInput from '../components/registration/PasswordInput';
import EmailInput from '../components/registration/EmailInput';
import NameInput from '../components/registration/NameInput';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [validUsername, setValidUsername] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const skipName = () => {
        setFirstName('');
        setLastName('');
        setStep(step + 1);
    }

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
            setUserCookies(data);
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        }
    };

    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}
            component="form"
            onSubmit={handleRegister}
        >

            {step === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                        Welcome to Gainz!
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                        Let's get your account set up. Before we begin, what is your name?
                    </Typography>
                    <NameInput nameType="First Name" setName={setFirstName} nameField={firstName} />
                    <NameInput nameType="Last Name" setName={setLastName} nameField={lastName} />
                    <Button variant='contained' onClick={nextStep} disabled={firstName === '' || lastName === ''}>
                        Next
                    </Button>
                    <Button onClick={skipName}>
                        Skip
                    </Button>
                </Box>
            )}
            {step === 2 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                        Let's create a username for you!
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                        This will be your unique screen name for other users to find you.
                    </Typography>
                    <UsernameInput sendUsername={setUsername} setValidUsername={setValidUsername} usernameField={username} />
                    <Button variant='contained' onClick={nextStep} disabled={!validUsername}>
                        Next
                    </Button>
                    <Button onClick={prevStep}>
                        Go Back
                    </Button>
                </Box>
            )}
            {step === 3 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                        What's a good email?
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                        This will help you if you have forgotten your password. Your email is not shared with others.
                    </Typography>
                    <EmailInput sendEmail={setEmail} setValidEmail={setValidEmail} emailField={email} />
                    <Button variant='contained' onClick={nextStep} disabled={!validEmail}>
                        Next
                    </Button>
                    <Button onClick={prevStep}>
                        Go Back
                    </Button>
                </Box>
            )}
            {step === 4 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                        Finally, let's secure your account with a password!
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                        We recommend using a mix of letters, numbers, and symbols.
                    </Typography>
                    <PasswordInput sendPassword={setPassword} setValidPassword={setValidPassword} passwordField={password} />
                    <Button variant='contained' onClick={handleRegister} disabled={!validPassword}>
                        Create my account!
                    </Button>
                    <Button onClick={prevStep}>
                        Go Back
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default RegistrationPage;
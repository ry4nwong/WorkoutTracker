import React, { useState } from 'react';
import { TextField } from '@mui/material';

const EmailInput = ({ sendEmail, sendEmailError }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const updateEmailError = (activateError) => {
        setEmailError(activateError);
        sendEmailError(activateError);
    };

    return (
        <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value === '') {
                    updateEmailError(true);
                    setEmailErrorMessage('Email Required!');
                } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value) == false) {
                    updateEmailError(true);
                    setEmailErrorMessage('Enter a valid email!');
                } else {
                    updateEmailError(false);
                    setEmailErrorMessage('');
                    sendEmail(e.target.value);
                }
            }}
            margin="normal"
            fullWidth
            error={emailError}
            helperText={emailErrorMessage}
            required
        />
    );
};

export default EmailInput;
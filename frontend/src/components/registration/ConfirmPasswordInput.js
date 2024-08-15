import React, { useState } from 'react';
import { TextField } from '@mui/material';

const ConfirmPasswordInput = ({ sendConfirmPassword, currentPassword, sendConfirmPasswordError }) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

    const updateConfirmPasswordError = (activateError) => {
        setConfirmPasswordError(activateError);
        sendConfirmPasswordError(activateError);
    };

    return (
        <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value === '' || e.target.value !== currentPassword) {
                    updateConfirmPasswordError(true);
                    setConfirmPasswordErrorMessage('Passwords must match!')
                } else {
                    updateConfirmPasswordError(false);
                    setConfirmPasswordErrorMessage('');
                    sendConfirmPassword(e.target.value);
                }
            }}
            margin="normal"
            fullWidth
            error={confirmPasswordError}
            helperText={confirmPasswordErrorMessage}
            required
        />
    );
};

export default ConfirmPasswordInput;
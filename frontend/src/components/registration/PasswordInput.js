import React, { useState } from 'react';
import { TextField } from '@mui/material';

const PasswordInput = ({ sendPassword, currentConfirmPassword, sendPasswordError }) => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const updatePasswordError = (activateError) => {
        setPasswordError(activateError);
        sendPasswordError(activateError);
    };

    return (
        <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value === '') {
                    updatePasswordError(true);
                    setPasswordErrorMessage('Password Required!')
                } else if(e.target.value !== currentConfirmPassword && currentConfirmPassword !== '') {
                    
                } else {
                    updatePasswordError(false);
                    setPasswordErrorMessage('');
                    sendPassword(e.target.value);
                }
            }}
            margin="normal"
            fullWidth
            error={passwordError}
            helperText={passwordErrorMessage}
            required
        />
    );
};

export default PasswordInput;
import React, { useState } from 'react';
import { TextField } from '@mui/material';

const ConfirmPasswordInput = ({ sendConfirmPassword, currentPassword, confirmPasswordField, setValidConfirmPassword }) => {
    const [color, setColor] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

    const handleChange = (e) => {
        const newConfirmPassword = e.target.value;
        sendConfirmPassword(newConfirmPassword);
        setValidConfirmPassword(false);
        setColor('');
        setConfirmPasswordErrorMessage('');

        if(newConfirmPassword === '' || newConfirmPassword !== currentPassword) {
            setColor('error');
            setConfirmPasswordErrorMessage('Passwords must match!');
        } else {
            setColor('success');
            setValidConfirmPassword(true);
        }
    };

    return (
        <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPasswordField}
            onChange={handleChange}
            margin="normal"
            fullWidth
            color={color}
            helperText={confirmPasswordErrorMessage}
            required
        />
    );
};

export default ConfirmPasswordInput;
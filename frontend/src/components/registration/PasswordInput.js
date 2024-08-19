import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const PasswordInput = ({ sendPassword, setValidPassword, passwordField }) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordColor, setPasswordColor] = useState('');
    const [confirmPasswordColor, setConfirmPasswordColor] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setValidPassword(false);
        sendPassword(newPassword);
        setPasswordColor('');
        setPasswordErrorMessage('');

        if (newPassword === '') {
            setPasswordColor('error');
            setPasswordErrorMessage('Password Required!');
        } else if (confirmPassword !== '' && newPassword !== confirmPassword) {
            setValidPassword(false);
            setConfirmPasswordColor('error');
            setConfirmPasswordErrorMessage('Passwords must match!');
        } else {
            setPasswordColor('');
            if (newPassword === confirmPassword) {
                setConfirmPasswordColor('success');
                setConfirmPasswordErrorMessage('');
                setValidPassword(true);
            }
        }
    };

    const handleConfirmChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setConfirmPasswordColor('');
        setConfirmPasswordErrorMessage('');

        if (newConfirmPassword === '' || newConfirmPassword !== passwordField) {
            setConfirmPasswordColor('error');
            setConfirmPasswordErrorMessage('Passwords must match!');
            setValidPassword(false);
        } else {
            setConfirmPasswordColor('success');
            setValidPassword(true);
        }
    };

    return (
        <Box>
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={passwordField}
                onChange={handlePasswordChange}
                margin="normal"
                fullWidth
                color={passwordColor}
                helperText={passwordErrorMessage}
                required
            />
            <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmChange}
                margin="normal"
                fullWidth
                color={confirmPasswordColor}
                helperText={confirmPasswordErrorMessage}
                required
            />
        </Box>

    );
};

export default PasswordInput;
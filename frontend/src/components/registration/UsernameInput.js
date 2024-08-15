import React, { useState } from 'react';
import { TextField } from '@mui/material';

const UsernameInput = ({ sendUsername, sendUsernameError}) => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

    const updateUsernameError = (activateError) => {
        setUsernameError(activateError);
        sendUsernameError(activateError);
    };

    return (
        <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
                if (e.target.value === '') {
                    updateUsernameError(true);
                    setUsernameErrorMessage('Username Required!');
                } else if (/^[a-zA-Z0-9]+$/.test(e.target.value) == false) {
                    updateUsernameError(true);
                    setUsernameErrorMessage('Username must only include letters (A-Z) and numbers (0-9)!');
                } else {
                    updateUsernameError(false);
                    setUsernameErrorMessage('');
                    sendUsername(e.target.value);
                }
            }}
            margin="normal"
            fullWidth
            error={usernameError}
            helperText={usernameErrorMessage}
            required
        />
    );
};

export default UsernameInput;
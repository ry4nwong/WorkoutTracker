import React, { useState, useRef } from 'react';
import { TextField } from '@mui/material';

const UsernameInput = ({ sendUsername, setValidUsername, usernameField }) => {
    const [color, setColor] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

    const debounceTimeout = useRef(null);

    const handleChange = (e) => {
        const newUsername = e.target.value;
        setValidUsername(false);
        sendUsername(newUsername);
        setColor('');
        setUsernameErrorMessage('');

        if (newUsername === '') {
            setColor('error');
            setUsernameErrorMessage('Username required!');
        } else if (/^[a-zA-Z0-9]+$/.test(e.target.value) == false) {
            setColor('error');
            setUsernameErrorMessage('Username must only include letters (A-Z) and numbers (0-9)!');
        } else {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            debounceTimeout.current = setTimeout(() => {
                if (newUsername) {
                    checkUsername(newUsername);
                }
            }, 1000);
        }
    };

    const checkUsername = async (username) => {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query UsernameExists($username: String!) {
                        usernameExists(username: $username)
                    }
                `,
                variables: {
                    username: username,
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const usernameInUse = data?.data?.usernameExists;

            if (!usernameInUse) {
                setValidUsername(true);
                setColor('success');
            } else {
                setColor('error');
                setUsernameErrorMessage('Username already in use!');
            }
        } else {
            console.error('Error checking username availability');
        }
    };


    return (
        <TextField
            label="Username"
            variant="outlined"
            value={usernameField}
            onChange={handleChange}
            margin="normal"
            fullWidth
            color={color}
            helperText={usernameErrorMessage}
            required
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                }
            }}
        />
    );
};

export default UsernameInput;
import React, { useState, useRef } from 'react';
import { TextField } from '@mui/material';

const EmailInput = ({ sendEmail, setValidEmail, emailField }) => {
    const [color, setColor] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const debounceTimeout = useRef(null);

    const handleChange = (e) => {
        const newEmail = e.target.value;
        setValidEmail(false);
        sendEmail(newEmail);
        setColor('');
        setEmailErrorMessage('');

        if(newEmail === '') {
            setColor('error');
            setEmailErrorMessage('Email required!');
        } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value) == false) {
            setColor('error');
            setEmailErrorMessage('Enter a valid email!');
        } else {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            debounceTimeout.current = setTimeout(() => {
                if (newEmail) {
                    checkEmail(newEmail);
                }
            }, 1000);
        }  
    };

    const checkEmail = async (email) => {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query EmailExists($email: String!) {
                        emailExists(email: $email)
                    }
                `,
                variables: {
                    email: email,
                },
            }),
        });
    
        if (response.ok) {
            const data = await response.json();
            const emailInUse = data?.data?.emailExists;
    
            if (!emailInUse) {
                setValidEmail(true);
                setColor('success');
            } else {
                setColor('error');
                setEmailErrorMessage('Email already in use!');
            }
        } else {
            console.error('Error checking email availability');
        }
    };
    

    return (
        <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={emailField}
            onChange={handleChange}
            margin="normal"
            fullWidth
            color={color}
            helperText={emailErrorMessage}
            required
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                }
            }}
        />
    );
};

export default EmailInput;
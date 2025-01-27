import { Box, Button } from '@mui/material';
import React from 'react';
import { getCookie } from '../../utils/Cookies';

const ThemeEditor = ({ darkMode, setDarkMode }) => {

    const setTheme = async (darkMode) => {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation UpdateDarkMode($id: ID!, $darkMode: Boolean!) {
                        updateDarkMode(id: $id, darkMode: $darkMode) {
                            darkMode
                        }
                    }
                `,
                variables: {
                    id: getCookie('id'),
                    darkMode: darkMode,
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const updatedTheme = data?.data?.updateDarkMode;

            if (updatedTheme) {
                setDarkMode(updatedTheme.darkMode);
            } else {
                console.error("Theme update failed:", data?.errors);
            }
        } else {
            console.log("Network error while updating theme");
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 4,
            }}
        >
            <Button
                onClick={() => setTheme(true)}
                disabled={darkMode}
                sx={{
                    width: '300px',
                    height: '70px',
                    fontSize: '18px',
                    backgroundColor: '#333333',
                    color: '#FFFFFF',
                    '&:disabled': {
                        backgroundColor: '#666666',
                        color: '#BBBBBB',
                    },
                }}
                variant="contained"
            >
                Dark Mode
            </Button>
            <Button
                onClick={() => setTheme(false)}
                disabled={!darkMode}
                sx={{
                    width: '300px',
                    height: '70px',
                    fontSize: '18px',
                    backgroundColor: '#FFFFFF',
                    color: '#333333',
                    border: '1px solid #333333',
                    '&:disabled': {
                        backgroundColor: '#EEEEEE',
                        color: '#AAAAAA',
                    },
                }}
                variant="outlined"
            >
                Light Mode
            </Button>
        </Box>
    );
};

export default ThemeEditor;

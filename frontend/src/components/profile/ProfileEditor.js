import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import UsernameInput from "../registration/UsernameInput";
import { getCookie } from "../../utils/Cookies";
import { useNavigate } from "react-router-dom";

const ProfileEditor = ({ oldUsername, oldFirstName, oldLastName, oldBiography, profileEditorOpen, setProfileEditorOpen }) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [biography, setBiography] = useState('');
    const [validUsername, setValidUsername] = useState(true);

    useEffect(() => {
        if (profileEditorOpen) {
            setUsername(oldUsername);
            setFirstName(oldFirstName);
            setLastName(oldLastName);
            setBiography(oldBiography);
        }
    }, [profileEditorOpen]);

    const handleConfirm = async () => {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation UpdateProfileInfo($id: ID!, $profileInput: ProfileInput!) {
                        updateProfileInfo(id: $id, profileInput: $profileInput) {
                            id
                            username
                            firstName
                            lastName
                            biography
                        }
                    }
                `,
                variables: {
                    id: getCookie('id'),
                    profileInput: {
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        biography: biography
                    },
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const updatedInfo = data?.data?.updateProfileInfo;

            if (updatedInfo) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                console.error("Profile update failed:", data?.errors);
            }
        } else {
            console.log("Network error while updating profile");
        }
    };

    const handleCancel = () => {
        setUsername(oldUsername);
        setFirstName(oldFirstName);
        setLastName(oldLastName);
        setBiography(oldBiography);
        setProfileEditorOpen(false);
    };

    return (
        <Dialog
            open={profileEditorOpen}
            fullWidth
            maxWidth="sm"
            onClose={handleCancel}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 4,
                    padding: 3,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'
                }
            }}
        >
            <DialogTitle
                textAlign="center"
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    marginBottom: 1,
                }}
            >
                Edit Profile
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 1 }}>
                    <UsernameInput
                        sendUsername={setUsername}
                        setValidUsername={setValidUsername}
                        usernameField={username}
                    />
                    <TextField
                        label="First Name"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                            }
                        }}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                            }
                        }}
                    />
                    <TextField
                        label="Biography"
                        fullWidth
                        multiline
                        rows={4}
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                            }
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', marginTop: 2 }}>
                <Button
                    onClick={handleCancel}
                    color="error"
                    variant="outlined"
                    sx={{
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        textTransform: 'none'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    color="primary"
                    variant="contained"
                    disabled={!validUsername && username !== oldUsername}
                    sx={{
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        textTransform: 'none'
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileEditor;
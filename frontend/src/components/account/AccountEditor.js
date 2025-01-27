import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import EmailInput from "../registration/EmailInput";
import { getCookie } from "../../utils/Cookies";

const AccountEditor = ({ currentEmail, setCurrentEmail }) => {
    const [email, setEmail] = useState(currentEmail);
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [editType, setEditType] = useState("");

    useEffect(() => {
        setEmail(currentEmail);
    }, [currentEmail]);

    const handleEmailChange = async () => {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation UpdateEmail($id: ID!, $email: String!) {
                        updateEmail(id: $id, email: $email) {
                            email
                        }
                    }
                `,
                variables: {
                    id: getCookie('id'),
                    email: email,
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const updatedEmail = data?.data?.updateEmail;

            if (updatedEmail) {
                setValidEmail(false);
                setCurrentEmail(updatedEmail.email);
                setEditType("Email");
                setAlertOpen(true);
            } else {
                console.error("Email update failed:", data?.errors);
            }
        } else {
            console.log("Network error while updating email");
        }
    };

    const handlePasswordChange = async () => {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation UpdatePassword($id: ID!, $password: String!) {
                        updatePassword(id: $id, password: $password) {
                            id
                        }
                    }
                `,
                variables: {
                    id: getCookie('id'),
                    password: password,
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const updatedPassword = data?.data?.updatePassword;

            if (updatedPassword) {
                setValidPassword(false);
                setPassword("");
                setEditType("Password");
                setAlertOpen(true);
            } else {
                console.error("Password update failed:", data?.errors);
            }
        } else {
            console.log("Network error while updating password");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            <Typography variant="h7" sx={{ fontWeight: "bold", marginTop: 2 }}>
                Change Email
            </Typography>

            <EmailInput
                emailField={email}
                sendEmail={setEmail}
                setValidEmail={setValidEmail}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: "bold", width: "20%" }}
                disabled={!validEmail}
                onClick={handleEmailChange}
            >
                Save
            </Button>

            <Typography variant="h7" sx={{ fontWeight: "bold", marginTop: 4 }}>
                Change Password
            </Typography>
            <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setValidPassword(e.target.value !== '' ? true : false);
                }}
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                    }
                }}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: "bold", width: "20%" }}
                disabled={!validPassword}
                onClick={handlePasswordChange}
            >
                Save
            </Button>

            <Typography variant="h7" sx={{ fontWeight: "bold", marginTop: 4 }}>
                Private Account
            </Typography>

            <Typography variant="h7" sx={{ fontWeight: "bold", marginTop: 4 }}>
                Delete Account
            </Typography>
            <Button
                variant="outlined"
                color="error"
                sx={{ fontWeight: "bold", padding: "10px 20px" }}
            >
                Delete Account
            </Button>
            <Snackbar open={alertOpen} autoHideDuration={5000} onClose={() => setAlertOpen(false)}>
                <Alert severity="success" variant="filled">
                    {editType} Updated!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AccountEditor;
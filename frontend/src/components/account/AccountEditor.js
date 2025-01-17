import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import EmailInput from "../registration/EmailInput";

const AccountEditor = ({ currentEmail }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    useEffect(() => {
        setEmail(currentEmail);
    }, [currentEmail]);

    const handleEmailChange = async () => {
        
    };

    const handlePasswordChange = () => {

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
            >
                Save
            </Button>

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
        </Box>
    );
};

export default AccountEditor;
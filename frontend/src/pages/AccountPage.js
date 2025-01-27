import React, { useEffect, useState } from "react";
import { Box, Container, Typography, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import HomeBar from "../components/home/HomeBar";
import UnitsEditor from "../components/account/UnitsEditor";
import AccountEditor from "../components/account/AccountEditor";
import { getCookie } from "../utils/Cookies";
import ThemeEditor from "../components/account/ThemeEditor";

const AccountPage = ({ darkMode, setDarkMode }) => {
    const [selectedMenu, setSelectedMenu] = useState("account");
    const [units, setUnits] = useState({ isUsingMiles: true, isUsingPounds: true, isUsingInches: true });
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query User($id: ID!) {
                            user(id: $id) {
                                email
                                units {
                                    isUsingMiles
                                    isUsingPounds
                                    isUsingInches
                                }
                            }
                        }
                    `,
                    variables: {
                        id: getCookie('id')
                    },
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const user = data?.data?.user;

                if (user) {
                    setEmail(user.email);
                    const currentUnits = user.units;
                    setUnits({
                        isUsingMiles: currentUnits.isUsingMiles,
                        isUsingPounds: currentUnits.isUsingPounds,
                        isUsingInches: currentUnits.isUsingInches
                    });
                } else {
                    console.error("Error fetching user:", data?.errors);
                }
            } else {
                console.error("Network error while fetching user");
            }
        };

        fetchProfile();
    }, []);

    const menuItems = [
        { label: "Account", value: "account" },
        { label: "Units", value: "units" },
        { label: "Body Data", value: "bodyData" },
        { label: "Appearance", value: "appearance" }
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
            <HomeBar setDarkMode={setDarkMode} />

            <Box sx={{ display: "flex", flex: 1 }}>
                <Paper
                    elevation={1}
                    sx={{ width: "25%", height: "100%", padding: 2, boxShadow: 2, borderRadius: 0 }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: 'center' }}>
                        Account Settings
                    </Typography>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem disablePadding key={item.value}>
                                <ListItemButton
                                    selected={selectedMenu === item.value}
                                    onClick={() => setSelectedMenu(item.value)}
                                    sx={{
                                        color: item.value === "account" ? "error.main" : "inherit",
                                        borderRadius: 2,
                                        '&.Mui-selected': {
                                            backgroundColor: "primary.main",
                                            color: "white",
                                        },
                                        '&:hover': {
                                            backgroundColor: "primary.light",
                                        },
                                    }}
                                >
                                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: "bold" }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                <Box
                    sx={{ flex: 1, padding: 3, overflow: "auto" }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 5, textAlign: "center" }}>
                        {(() => {
                            switch (selectedMenu) {
                                case "account":
                                    return "Account";
                                case "units":
                                    return "Units";
                                case "bodyData":
                                    return "Body Data";
                                case "appearance":
                                    return "Appearance";
                                default:
                                    return "";
                            }
                        })()}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {(() => {
                            switch (selectedMenu) {
                                case "account":
                                    return <AccountEditor currentEmail={email} setCurrentEmail={setEmail} />;
                                case "units":
                                    return <UnitsEditor units={units} setUnits={setUnits} />
                                case "bodyData":
                                    return "Body Data coming soon.";
                                case "appearance":
                                    return <ThemeEditor darkMode={darkMode} setDarkMode={setDarkMode} />;
                                default:
                                    return "";
                            }
                        })()}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AccountPage;

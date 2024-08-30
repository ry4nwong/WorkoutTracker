import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { deleteUserCookies } from "../../js/Cookies";

const HomeBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const navigatePage = (location) => {
        navigate(location);
    };

    const logOut = () => {
        deleteUserCookies();
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Button variant="filled" sx={{ "&:hover": { backgroundColor: "transparent" } }} onClick={() => navigatePage('/home')}>
                    <Typography variant="h6">Gainz</Typography>
                </Button>
                <Box sx={{ flexGrow: 2 }} />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigatePage('/create')}
                    style={{ marginRight: '10px' }}
                >
                    Create New Workout
                </Button>

                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => navigatePage('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={() => navigatePage('/account')}>My Account</MenuItem>
                    <MenuItem onClick={logOut}>Log Out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default HomeBar;
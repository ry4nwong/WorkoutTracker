import React from "react";
import HomeBar from "../components/home/HomeBar";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import WorkoutFeed from "../components/home/WorkoutFeed";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCookie } from "../js/Cookies";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const name = getCookie('name');
    const username = getCookie('username');

    return (
        <Container>
            <HomeBar />

            <Box sx={{ m: 5, width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <AccountCircleIcon sx={{ fontSize: 200 }} />
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container direction="column" spacing={1.5}>
                            <Grid item>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography sx={{ fontWeight: 'bold' }} variant="h4">{name}</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'normal' }}>@{username}</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Typography variant="h7">0 Workouts Completed</Typography>
                                    <Typography variant="h7" component={Link}>0 Followers</Typography>
                                    <Typography variant="h7" component={Link}>0 Following</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <TextField fullWidth defaultValue="No Bio Yet" disabled/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" fullWidth>Edit Profile</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    // height: 'calc(100vh - 70px)',
                    // textAlign: 'center',
                    width: '100%',
                    // m: 5
                }}
            >
                <Typography textAlign="center" variant='h5' sx={{ m: 5 }}>My Workouts</Typography>
                <WorkoutFeed />
            </Box>

        </Container>
    )
};

export default ProfilePage;
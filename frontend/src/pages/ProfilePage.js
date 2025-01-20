import React from "react";
import HomeBar from "../components/home/HomeBar";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import WorkoutFeed from "../components/home/WorkoutFeed";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCookie } from "../js/Cookies";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileEditor from "../components/profile/ProfileEditor";

const ProfilePage = ({ setDarkMode }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [biography, setBiography] = useState('');
    const [totalWorkouts, setTotalWorkouts] = useState(0);
    const [profileEditorOpen, setProfileEditorOpen] = useState(false);

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
                                username
                                firstName
                                lastName
                                biography
                                workouts {
                                    id
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
                    setUsername(user.username);
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                    setBiography(user.biography);
                    setTotalWorkouts(user.workouts.length);
                } else {
                    console.error("Error fetching user:", data?.errors);
                }
            } else {
                console.error("Network error while fetching user");
            }
        };

        fetchProfile();
    }, []);

    return (
        <Container>
            <HomeBar setDarkMode={setDarkMode} />
            <Box sx={{ m: 5, width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <AccountCircleIcon sx={{ fontSize: 200 }} />
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container direction="column" spacing={1.5}>
                            <Grid item>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography sx={{ fontWeight: 'bold' }} variant="h4">{firstName + ' ' + lastName}</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'normal' }}>@{username}</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Typography variant="h7">{totalWorkouts} Workouts Completed</Typography>
                                    <Button variant="h7" component={Link}>0 Followers</Button>
                                    <Button variant="h7" component={Link}>0 Following</Button>
                                </Box>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    value={biography === '' ? "No Bio Yet" : biography}
                                    disabled
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" fullWidth onClick={() => setProfileEditorOpen(true)}>Edit Profile</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <Typography textAlign="center" variant='h5' sx={{ m: 5 }}>My Workouts</Typography>
                <WorkoutFeed />
            </Box>
            <ProfileEditor
                oldUsername={username}
                oldFirstName={firstName}
                oldLastName={lastName}
                oldBiography={biography}
                profileEditorOpen={profileEditorOpen}
                setProfileEditorOpen={setProfileEditorOpen}
            />
        </Container>
    )
};

export default ProfilePage;
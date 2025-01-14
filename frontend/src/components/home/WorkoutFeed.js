import { Box, Button, Container, Grid, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../js/Cookies";
import { DataGrid } from "@mui/x-data-grid";

const WorkoutFeed = () => {
    const [feed, setFeed] = useState([]);


    useEffect(() => {
        const fetchFeed = async () => {
            const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query GetAllWorkouts($userId: ID!) {
                            getAllWorkouts(userId: $userId) {
                                id
                                workoutName
                                description
                                duration
                                date
                                totalVolumePounds
                                exercises {
                                    ... on WeightExercise {
                                        id
                                        exerciseName
                                        description
                                        muscleTargeted
                                        sets {
                                            id
                                            weight
                                            reps
                                        }
                                    }
                                    ... on CardioExercise {
                                        id
                                        exerciseName
                                        description
                                        sets {
                                            id
                                            duration
                                            distance
                                        }
                                    }
                                    ... on BodyweightExercise {
                                        id
                                        exerciseName
                                        description
                                        muscleTargeted
                                        sets {
                                            id
                                            reps
                                        }
                                    }
                                }
                            }
                        }
                    `,
                    variables: {
                        userId: getCookie('id')
                    },
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const workouts = data?.data?.getAllWorkouts;

                if (workouts) {
                    setFeed(workouts.reverse()); // Reverse the array and update the feed
                } else {
                    console.error("Error fetching workouts:", data?.errors);
                }
            } else {
                console.error("Network error while fetching workouts");
            }
        };

        fetchFeed();
    }, []);


    return (
        <Paper elevation={0} sx={{ width: '100%', bgcolor: 'background.default' }}>
            <List sx={{ width: '100%', alignItems: 'center' }}>
                {feed.map((workout, index) => (
                    <ListItem key={workout.id} sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Box width='50%' mx="auto">
                            <Grid container>
                                <Grid item xs={6}>
                                    <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>{workout.workoutName}</ListItemText>
                                </Grid>
                                <Grid item xs={5}>
                                    <ListItemText primaryTypographyProps={{ fontSize: '16px' }}>Total Volume: {workout.totalVolumePounds} lbs</ListItemText>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button size="large">View</Button>
                                </Grid>
                            </Grid>
                            <DataGrid
                                rows={workout.exercises.slice(0, 4)}
                                columns={[
                                    { field: 'exerciseName', headerName: 'Exercise', sortable: false, filterable: false, width: 250, headerAlign: 'center', align: 'center' },
                                    { field: 'muscleTargeted', headerName: 'Muscle Targeted', sortable: false, filterable: false, width: 150, headerAlign: 'center', align: 'center' },
                                    {
                                        field: 'sets',
                                        headerName: 'Sets',
                                        sortable: false,
                                        filterable: false,
                                        width: 150,
                                        headerAlign: 'center',
                                        align: 'center',
                                        valueGetter: (value) => { return value.length; }
                                    }
                                ]}
                                disableColumnMenu
                                hideFooter
                                disableColumnResize
                                autoHeight
                                sx={{ width: '100%' }}

                            />
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default WorkoutFeed;
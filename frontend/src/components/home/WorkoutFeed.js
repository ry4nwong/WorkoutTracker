import { Box, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../utils/Cookies";
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
                                username
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
                    setFeed(workouts.reverse());
                } else {
                    console.error("Error fetching workouts:", data?.errors);
                }
            } else {
                console.error("Network error while fetching workouts");
            }
        };

        fetchFeed();
    }, []);

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
    };

    const formatDate = (date) => {
        const now = new Date();
        const workoutDate = new Date(date);
        const diffInSeconds = Math.floor((now - workoutDate) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffInSeconds < 172800) {
            return `Yesterday`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
    };

    return (
        <Paper elevation={0} sx={{ width: '70%', margin: '0 auto', bgcolor: 'background.default', padding: 2 }}>
            {feed.map((workout) => (
                <Box
                    key={workout.id}
                    sx={{
                        mb: 4,
                        cursor: 'pointer',
                        padding: 2,
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: 1
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption">{workout.username}</Typography>
                        <Typography variant="caption">{formatDate(workout.date)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{workout.workoutName}</Typography>
                        <Typography variant="caption">Total Volume: {workout.totalVolumePounds} lbs</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1">{workout.description}</Typography>
                    </Box>
                    <TableContainer>
                        <Table sx={{ minWidth: 650, border: 'hidden' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '12px' }}>Exercise Name</TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            textAlign: 'center',
                                            width: '200px',
                                        }}
                                    >
                                        Sets Completed
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workout.exercises.slice(0, 3).map((exercise) => (
                                    <TableRow key={exercise.id}>
                                        <TableCell sx={{ fontSize: '14px' }}>
                                            {exercise.exerciseName}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: '14px',
                                                textAlign: 'center',
                                                width: '200px'
                                            }}
                                        >
                                            {exercise.sets.length}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {workout.exercises.length > 3 && (
                                    <TableRow>
                                        <TableCell colSpan={2} sx={{ fontSize: '14px' }}>
                                            {workout.exercises.length - 3 === 1
                                                ? '1 more exercise...'
                                                : `${workout.exercises.length - 3} more exercises...`}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Box>
            ))}
        </Paper>

    );
};

export default WorkoutFeed;
import { Alert, Box, Button, Container, Dialog, DialogContent, DialogTitle, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExerciseList from "../components/workout/ExerciseList";
import CurrentExerciseList from "../components/workout/CurrentExerciseList";
import WorkoutBar from "../components/workout/WorkoutBar";
import { getCookie, validateCookies } from "../js/Cookies";
import { useNavigate } from "react-router-dom";
import FinishWorkoutPopup from "../components/workout/FinishWorkoutPopup";

const WorkoutPage = () => {
    const [exerciseListVisibility, setExerciseListVisibility] = useState(false);
    const [currentExercises, setCurrentExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [timer, setTimer] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);
    const [workoutFinished, setWorkoutFinished] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const navigate = useNavigate();
    const startTime = new Date();

    useEffect(() => {
        if (validateCookies() === false) {
            navigate('/login');
            return;
        }

        const fetchExercises = async () => {
            const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query GetAllExercises {
                            allExercises {
                                ... on WeightExercise {
                                    id
                                    exerciseType
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
                                    exerciseType
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
                                    exerciseType
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
                    `
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data?.data?.allExercises);
                setExercises(data?.data?.allExercises);
            } else {
                console.error("Error fetching exercises");
            }
        };

        fetchExercises();
    }, []);



    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('pageswap', handleBeforeUnload);
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('pageswap', handleBeforeUnload);
        }
    }, []);

    const addChosenExercise = (exercise) => {
        let newExercise = structuredClone(exercise);
        currentExercises.push(newExercise);
        setExerciseListVisibility(false);
    };

    const updateTotalVolume = (newVolume) => {
        setTotalVolume(totalVolume + parseFloat(newVolume));
    };

    const finishWorkout = async () => {
        const formattedExercises = currentExercises.map(exercise => {
            const { exerciseType, ...rest } = exercise;

            if (exerciseType === 'WEIGHT') {
                return {
                    exerciseType: 'WEIGHT',
                    weightExercise: {
                        ...rest,
                        sets: rest.sets.map(set => ({
                            ...set,
                            reps: parseInt(set.reps, 10),
                            weight: parseFloat(set.weight),
                        })),
                    },
                };
            } else if (exerciseType === 'CARDIO') {
                return {
                    exerciseType: 'CARDIO',
                    cardioExercise: {
                        ...rest,
                        sets: rest.sets.map(set => ({
                            ...set,
                            duration: set.duration,
                            distance: parseFloat(set.distance),
                        })),
                    },
                };
            } else if (exerciseType === 'BODYWEIGHT') {
                return {
                    exerciseType: 'BODYWEIGHT',
                    bodyweightExercise: {
                        ...rest,
                        sets: rest.sets.map(set => ({
                            ...set,
                            reps: parseInt(set.reps, 10),
                        })),
                    },
                };
            } else {
                throw new Error(`Unknown exercise type: ${exerciseType}`);
            }
        });

        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation CreateWorkout($userId: ID!, $workoutInput: WorkoutInput!) {
                        createWorkout(userId: $userId, workoutInput: $workoutInput) {
                            id
                            workoutName
                            description
                            duration
                            totalVolumePounds
                        }
                    }
                `,
                variables: {
                    userId: getCookie('id'),
                    workoutInput: {
                        workoutName: workoutName,
                        description: workoutDescription,
                        date: startTime.toISOString(),
                        duration: parseInt(timer),
                        totalVolumePounds: parseFloat(totalVolume),
                        exercises: formattedExercises,
                    },
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const createdWorkout = data?.data?.createWorkout;

            if (createdWorkout) {
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
                setAlertOpen(true);
            } else {
                console.error("Workout creation failed:", data?.errors);
            }
        } else {
            console.log("Network error while creating workout");
        }
    };

    const openWorkoutFinished = () => {
        setWorkoutFinished(true);
    }

    return (
        <Container
            sx={{
                display: 'flex', // Makes the container a flexbox
                flexDirection: 'column', // Stacks children vertically
                justifyContent: 'flex-start', // Centers content vertically
                alignItems: 'center', // Centers content horizontally
                minHeight: '100vh', // Ensures the container takes up the full viewport height
                marginY: 10, // Margin for spacing
                maxWidth: '100%'
            }}
        >
            <WorkoutBar
                timer={timer}
                setTimer={setTimer}
                totalVolume={totalVolume}
                finishWorkout={openWorkoutFinished}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    alignItems: 'center',
                    gap: 2,
                    width: '80%', // Ensures it doesn't limit child centering
                }}
            >
                {currentExercises.length !== 0 ? (
                    <CurrentExerciseList
                        currentExercises={currentExercises}
                        setCurrentExercises={setCurrentExercises}
                        updateTotalVolume={(newVolume) => updateTotalVolume(newVolume)}
                    />
                ) : (
                    <Typography sx={{ height: '30px', marginTop: 4 }}>
                        No exercises logged yet! Add an exercise.
                    </Typography>
                )}
                <Button
                    variant="contained"
                    onClick={() => setExerciseListVisibility(true)}
                    sx={{ width: '57%' }}
                >
                    Add Exercise
                </Button>
            </Box>

            <FinishWorkoutPopup
                workoutFinished={workoutFinished}
                setWorkoutName={(e) => setWorkoutName(e)}
                setWorkoutDescription={(e) => setWorkoutDescription(e)}
                setWorkoutFinished={(e) => setWorkoutFinished(e)}
                finishWorkout={finishWorkout}
                workoutName={workoutName}
                workoutDescription={workoutDescription}
            />

            <Snackbar open={alertOpen} autoHideDuration={2000}>
                <Alert severity="success" variant="filled">
                    Workout Created!
                </Alert>
            </Snackbar>

            <ExerciseList
                exercises={exercises}
                setChosenExercise={(exercise) => addChosenExercise(exercise)}
                exerciseListVisibility={exerciseListVisibility}
                setExerciseListVisibility={setExerciseListVisibility}
            />
        </Container>
    );
};

export default WorkoutPage;
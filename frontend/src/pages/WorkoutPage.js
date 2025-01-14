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
                    `
                }),
            });
        
            if (response.ok) {
                const data = await response.json();
                console.log(data);
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
        newExercise.exerciseType = 'muscleTargeted' in exercise ? "weight" : "cardio";
        currentExercises.push(newExercise);
        setExerciseListVisibility(false);
    };

    const updateTotalVolume = (newVolume) => {
        setTotalVolume(totalVolume + parseFloat(newVolume));
    };

    const finishWorkout = async () => {
        const formattedExercises = currentExercises.map(exercise => {
            const { exerciseType, ...rest } = exercise;
    
            if (exerciseType === 'weight') {
                return {
                    exerciseType: 'WEIGHT',
                    weightExercise: {
                        ...rest,
                    },
                };
            } else if (exerciseType === 'cardio') {
                return {
                    exerciseType: 'CARDIO',
                    cardioExercise: {
                        ...rest,
                    },
                };
            } else if (exerciseType === 'bodyweight') {
                return {
                    exerciseType: 'BODYWEIGHT',
                    bodyweightExercise: {
                        ...rest,
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
                    userId: getCookie('id'),
                    workoutInput: {
                        workoutName: workoutName,
                        description: workoutDescription,
                        date: startTime.toISOString(),
                        duration: timer,
                        totalVolumePounds: totalVolume,
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
        <Container sx={{m: 10}}>
            <WorkoutBar timer={timer} setTimer={setTimer} totalVolume={totalVolume} finishWorkout={openWorkoutFinished} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                {currentExercises.length !== 0
                    ? <CurrentExerciseList currentExercises={currentExercises} setCurrentExercises={setCurrentExercises} updateTotalVolume={(newVolume) => updateTotalVolume(newVolume)} />
                    : <Typography sx={{ height: '30px', marginTop: 4 }}>No exercises logged yet! Add an exercise.</Typography>
                }
                <Button variant="contained" onClick={() => setExerciseListVisibility(true)} sx={{ width: '57%' }}>
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
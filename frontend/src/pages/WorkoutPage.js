import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExerciseList from "../components/workout/ExerciseList";
import CurrentExerciseList from "../components/workout/CurrentExerciseList";
import WorkoutBar from "../components/workout/WorkoutBar";
import { useNavigate } from "react-router-dom";

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

    useEffect(() => {
        if (document.cookie === '') {
            navigate('/login');
            return;
        }
        const fetchExercises = async () => {
            const response = await fetch('http://localhost:8080/api/exercises/all')
                .then(response => response.json())
                .then(data => setExercises(data));
        };

        fetchExercises();
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, []);

    const addChosenExercise = (exercise) => {
        let newExercise = structuredClone(exercise);
        newExercise.exerciseType = 'muscleTargeted' in exercise ? "weight" : "cardio";
        currentExercises.push(newExercise);
        setExerciseListVisibility(false);
    };

    const updateTotalVolume = (newVolume) => {
        setTotalVolume(totalVolume + parseInt(newVolume));
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const finishWorkout = async () => {
        // console.log(JSON.stringify(currentExercises));
        const response = await fetch(`http://localhost:8080/api/workouts/create/${getCookie('username')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                workoutName: workoutName,
                description: workoutDescription,
                duration: timer,
                totalVolumePounds: totalVolume,
                exercises: currentExercises
            })
        });

        if (response.ok) {
            setTimeout(() => {
                navigate('/home');
            }, 2000);
            setAlertOpen(true);
        } else {
            console.log("workout creation failed");
        }
    };

    const openWorkoutFinished = () => {
        setWorkoutFinished(true);
    }

    return (
        <div>
            <WorkoutBar timer={timer} setTimer={setTimer} totalVolume={totalVolume} finishWorkout={openWorkoutFinished} />
            <Box sx={{ height: '70px' }} />
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

            <Dialog open={workoutFinished} fullWidth maxWidth="md">
                <DialogTitle textAlign='center'>Finish Workout</DialogTitle>
                <Box />
                <DialogContent>
                    <TextField 
                        fullWidth 
                        label="Workout Name" 
                        onChange={(e) => setWorkoutName(e.target.value)} 
                        required
                        value={workoutName}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField 
                        fullWidth 
                        label="Workout Description" 
                        multiline rows={4}
                        onChange={(e) => setWorkoutDescription(e.target.value)} 
                        value={workoutDescription}
                    />
                </DialogContent>
                <DialogContent>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Button fullWidth color="error" onClick={() => setWorkoutFinished(false)}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button fullWidth variant='contained' onClick={finishWorkout}>Complete Workout</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

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
        </div>
    );
};

export default WorkoutPage;
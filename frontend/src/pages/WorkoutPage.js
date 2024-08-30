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

    useEffect(() => {
        if (validateCookies() === false) {
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
        setTotalVolume(totalVolume + parseInt(newVolume));
    };

    const finishWorkout = async () => {
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
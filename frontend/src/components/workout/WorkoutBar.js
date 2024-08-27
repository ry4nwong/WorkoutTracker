import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import WorkoutTimer from "./WorkoutTimer";
import { useNavigate } from "react-router-dom";

const WorkoutBar = ({ timer, setTimer, totalVolume, finishWorkout }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" color="">
            <Toolbar>
                <Typography variant="h6">Total Volume: {totalVolume} lbs</Typography>
                <Box sx={{ flexGrow: 2 }} />

                <WorkoutTimer timer={timer} setTimer={setTimer} />
                <Box sx={{ flexGrow: 1 }} />

                <Button variant="outlined" color="error" onClick={() => navigate('/home')}>
                    Discard Workout
                </Button>
                <Button variant="contained" onClick={finishWorkout}>
                    Finish Workout
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default WorkoutBar;
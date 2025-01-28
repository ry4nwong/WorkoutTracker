import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import WorkoutTimer from "./WorkoutTimer";
import { useNavigate } from "react-router-dom";

const WorkoutBar = ({ timer, setTimer, totalVolume, finishWorkout }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ backgroundColor: '#333333', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                        Total Volume: {totalVolume} lbs
                    </Typography>
                    <WorkoutTimer timer={timer} setTimer={setTimer} />
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" color="error" onClick={() => navigate('/home')} sx={{ fontWeight: "bold" }}>
                        Discard Workout
                    </Button>
                    <Button variant="contained" onClick={finishWorkout} sx={{ fontWeight: "bold" }}>
                        Finish Workout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default WorkoutBar;
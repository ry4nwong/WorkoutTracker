import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const WorkoutTimer = ({timer, setTimer}) => {
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const hours = Math.floor (time / 60 / 60);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            Workout Duration: {formatTime(timer)}
        </Typography>
    );
};

export default WorkoutTimer;
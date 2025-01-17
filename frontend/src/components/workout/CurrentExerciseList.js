import { Box, Button, List, ListItem, ListItemText, Paper, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from "react";
import WeightExercise from "./WeightExercise";
import CardioExercise from "./CardioExercise";
import BodyweightExercise from "./BodyweightExercise";

const CurrentExerciseList = ({ currentExercises, setCurrentExercises, updateTotalVolume }) => {

    const setExercise = (updatedExercise) => {
        setCurrentExercises((prevExercises) => prevExercises.map((exercise) =>
            exercise.exerciseName === updatedExercise.exerciseName
                ? updatedExercise : exercise))
    };

    const removeExercise = (indexToRemove) => {
        currentExercises.splice(indexToRemove, 1);
    };

    return (
        <List sx={{ width: '70%' }}>
            {currentExercises.map((exercise, index) => (
                <ListItem key={`${exercise.exerciseName}-${index}`}>
                    {exercise.exerciseType === 'WEIGHT' && (
                    <WeightExercise 
                        exercise={exercise} 
                        setExercise={(updatedExercise) => setExercise(updatedExercise)} 
                        updateTotalVolume={updateTotalVolume} 
                        removeExercise={(toRemove) => removeExercise(toRemove)} 
                        index={index}
                    />
                )}
                {exercise.exerciseType === 'CARDIO' && (
                    <CardioExercise 
                        exercise={exercise} 
                        setExercise={(updatedExercise) => setExercise(updatedExercise)} 
                        removeExercise={(toRemove) => removeExercise(toRemove)} 
                        index={index}
                    />
                )}
                {exercise.exerciseType === 'BODYWEIGHT' && (
                    <BodyweightExercise 
                        exercise={exercise} 
                        setExercise={(updatedExercise) => setExercise(updatedExercise)} 
                        updateTotalVolume={updateTotalVolume}
                        removeExercise={(toRemove) => removeExercise(toRemove)} 
                        index={index}
                    />
                )}
                </ListItem>
            ))}
        </List>
    );

}

export default CurrentExerciseList;
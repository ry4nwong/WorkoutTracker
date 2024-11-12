import { Button, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ExerciseList = ({ exercises, setChosenExercise, exerciseListVisibility, setExerciseListVisibility }) => {
    const [search, setSearch] = useState('');
    const [searchedExercises, setSearchedExercises] = useState([]);

    const searchExercise = (query) => {
        setSearch(query);
        setSearchedExercises(exercises.filter(exercise => exercise.exerciseName.toLowerCase().includes(query.toLowerCase())));
    }

    return (
        <Dialog
            open={exerciseListVisibility}
            maxWidth="sm"
            fullWidth
            onClose={() => {
                setExerciseListVisibility(false);
                setSearch('');
            }}
            sx={{ height: '70%', minHeight: '70%' }}
        >
            <DialogTitle textAlign='center' sx={{ bgcolor: '#ffffff' }}>Select an Exercise</DialogTitle>
            <Button
                onClick={() => {
                    setExerciseListVisibility(false);
                    setSearch('');
                }}
                color="error"
                sx={{ bgcolor: '#ffffff' }}
            >
                Cancel
            </Button>
            <TextField label="Search" value={search} onChange={e => searchExercise(e.target.value)} sx={{ bgcolor: '#ffffff' }}/>
            <List sx={{ bgcolor: '#ffffff' }}>
                <DialogContent sx={{ bgcolor: '#ffffff' }}>
                    {(search === '' ? exercises : searchedExercises).map((exercise) => (
                        <ListItem key={exercise.exerciseName}>
                            <ListItemButton onClick={() => {
                                setChosenExercise(exercise);
                                setSearch('');
                            }}>
                                <ListItemText primary={exercise.exerciseName} secondary={exercise.muscleTargeted} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                </DialogContent>
            </List>
        </Dialog>
    );
};

export default ExerciseList;
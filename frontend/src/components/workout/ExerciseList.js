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
            sx={{
                height: '70%',
                minHeight: '70%',
                '& .MuiDialog-paper': {
                    overflowY: 'auto',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                }
            }}
                >
            <DialogTitle textAlign='center'>Select an Exercise</DialogTitle>
            <Button
                onClick={() => {
                    setExerciseListVisibility(false);
                    setSearch('');
                }}
                color="error"
            >
                Cancel
            </Button>
            <TextField label="Search" value={search} onChange={e => searchExercise(e.target.value)} />
            <List>
                <DialogContent>
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
        </Dialog >
    );
};

export default ExerciseList;
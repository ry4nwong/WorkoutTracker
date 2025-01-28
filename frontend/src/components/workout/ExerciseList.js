import { Button, Dialog, DialogContent, DialogTitle, Box, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
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
                '& .MuiDialog-paper': {
                    height: '100%',
                    borderRadius: 4,
                    padding: 2,
                    overflowY: 'auto',
                    '::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c1c1c1',
                        borderRadius: '4px',
                    },
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <DialogTitle sx={{ textAlign: 'center', flex: 1, margin: 0, padding: 0 }}>Select an Exercise</DialogTitle>
                <Button
                    onClick={() => {
                        setExerciseListVisibility(false);
                        setSearch('');
                    }}
                    color="error"
                    variant="outlined"
                    sx={{ marginRight: 1 }}
                >
                    Cancel
                </Button>
            </Box>

            <TextField
                label="Search"
                value={search}
                onChange={(e) => searchExercise(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />

            <List sx={{ maxHeight: 'calc(100% - 120px)', overflowY: 'auto' }}>
                {(search === '' ? exercises : searchedExercises).map((exercise) => (
                    <ListItem key={exercise.exerciseName} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                setChosenExercise(exercise);
                                setSearch('');
                            }}
                            sx={{
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                        >
                            <ListItemText
                                primary={exercise.exerciseName}
                                secondary={exercise.muscleTargeted}
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                                secondaryTypographyProps={{ color: 'text.secondary' }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};

export default ExerciseList;
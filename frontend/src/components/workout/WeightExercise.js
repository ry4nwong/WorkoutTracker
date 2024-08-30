import { MoreVertOutlined } from "@mui/icons-material";
import { Box, Button, Dialog, DialogTitle, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

const WeightExercise = ({ exercise, setExercise, updateTotalVolume, removeExercise, index }) => {
    const [sets, setSets] = useState(exercise.sets);
    const [description, setDescription] = useState(exercise.description);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => setExercise({ ...exercise, sets: sets }), [sets]);

    useEffect(() => setExercise({ ...exercise, description: description }), [description]);

    const handleAddSet = () => {
        setSets(prevSets => [...prevSets, { id: sets.length + 1, weight: '0', reps: '0' }]);
    };

    const handleRemoveSet = (setId) => {
        var setNumber = 1;
        const oldRow = sets.find((set) => set.id === setId);
        updateTotalVolume(-1 * oldRow.weight * oldRow.reps);
        const filteredSets = sets.filter((set) => set.id !== setId);
        setSets(filteredSets.map((set) => ({ ...set, id: setNumber++ })));
        exercise.sets = sets;
    };

    const handleRowEdit = (updatedRow) => {
        const oldRow = sets.find((set) => set.id === updatedRow.id);
        updateTotalVolume((updatedRow.weight * updatedRow.reps) - (oldRow.weight * oldRow.reps));
        setSets(prevSets => prevSets.map((set) => set.id === updatedRow.id ? updatedRow : set));
        exercise.sets = sets;
        return updatedRow;
    };

    return (
        <Paper sx={{ width: '100%' }} elevation={0}>
            <Grid container>
                <Grid item xs={11.5}>
                    <ListItemText primary={exercise.exerciseName} />
                </Grid>
                <Grid item xs={0.5}>
                    <IconButton onClick={() => setShowSettings(true)}>
                        <MoreVertOutlined />
                    </IconButton>
                </Grid>
            </Grid>
            <TextField label="Notes" style={{ width: '100%' }} onBlur={(e) => setDescription(e.target.value)}></TextField>
            <DataGrid
                rows={sets}
                columns={[
                    { field: 'id', headerName: 'Set', sortable: false, filterable: false, width: 150, headerAlign: 'center', align: 'center' },
                    { field: 'weight', headerName: 'Weight (lbs)', sortable: false, filterable: false, width: 150, editable: true, headerAlign: 'center', align: 'center' },
                    { field: 'reps', headerName: 'Reps', sortable: false, filterable: false, width: 150, editable: true, headerAlign: 'center', align: 'center' },
                    {
                        renderCell: (params) => (
                            <Button onClick={() => handleRemoveSet(params.row.id)}>Remove</Button>
                        ),
                        sortable: false,
                        filterable: false,
                        width: 150,
                        align: 'center'
                    },
                ]}
                disableColumnMenu
                hideFooter
                processRowUpdate={(updatedRow) => handleRowEdit(updatedRow, exercise)}
                onProcessRowUpdateError={(error) => console.log(error)}
                disableColumnResize
                autoHeight
            />
            <Box>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddSet}
                    fullWidth
                >
                    Add Set
                </Button>
            </Box>

            <Dialog open={showSettings} onClose={() => setShowSettings(false)}>
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => removeExercise(index)}>Remove Exercise</ListItemButton>
                    </ListItem>
                </List>
            </Dialog>
        </Paper>
    )
};

export default WeightExercise;
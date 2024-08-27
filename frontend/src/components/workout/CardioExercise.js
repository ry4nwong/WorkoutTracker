import { MoreVertOutlined } from "@mui/icons-material";
import { Box, Button, ListItemText, Paper, TextField, Switch, Grid, IconButton, Dialog, List, ListItem, ListItemButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

const CardioExercise = ({ exercise, setExercise, removeExercise, index }) => {
    const [sets, setSets] = useState(exercise.sets);
    const [description, setDescription] = useState(exercise.description);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => setExercise({ ...exercise, sets: sets }), [sets]);

    useEffect(() => setExercise({ ...exercise, description: description }), [description]);

    const handleAddSet = () => {
        setSets(prevSets => [...prevSets, { id: sets.length + 1, duration: '00:00', distance: '0' }]);
    };

    const handleRemoveSet = (setId) => {
        var setNumber = 1;
        const filteredSets = sets.filter((set) => set.id !== setId);
        setSets(filteredSets.map((set) => ({ ...set, id: setNumber++ })));
        exercise.sets = sets;
    };

    const handleRowEdit = (updatedRow) => {
        setSets(prevSets => prevSets.map((set) => set.id === updatedRow.id ? updatedRow : set));
        exercise.sets = sets;
        return updatedRow;
    };

    return (
        <Paper style={{ width: '100%' }} elevation={0}>
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
                    { field: 'duration', headerName: 'Duration', sortable: false, filterable: false, width: 150, editable: true, headerAlign: 'center', align: 'center' },
                    { field: 'distance', headerName: 'Distance (mi)', sortable: false, filterable: false, width: 150, editable: true, headerAlign: 'center', align: 'center' },
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
                sx={{ height: `${sets.length * 55 + 55}px` }}
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

export default CardioExercise;
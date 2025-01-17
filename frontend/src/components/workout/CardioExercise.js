import { MoreVertOutlined } from "@mui/icons-material";
import { Box, Button, ListItemText, Switch, Grid, IconButton, Dialog, List, ListItem, ListItemButton, Paper, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
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
        <Paper sx={{ width: '100%', bgcolor: 'background.default', padding: 2 }} elevation={0}>
            <TableContainer>
                <Table sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow sx={{ borderBottom: 'none' }}>
                            <TableCell colSpan={4} sx={{ fontWeight: 'bold', fontSize: '20px', borderBottom: 'none', paddingBottom: 0 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{exercise.exerciseName}</Typography>
                                    <IconButton onClick={() => setShowSettings(true)}>
                                        <MoreVertOutlined />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ borderBottom: 'none' }}>
                            <TableCell colSpan={4} sx={{ borderBottom: 'none', paddingTop: 0 }}>
                                <TextField
                                    label="Notes"
                                    fullWidth
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    onBlur={(e) => setDescription(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: 'none' }}>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Set</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Duration</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Distance (mi)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
                        </TableRow>
                        {sets.map((set) => (
                            <TableRow key={set.id} sx={{ borderBottom: 'none' }}>
                                <TableCell align="center" sx={{ borderBottom: 'none' }}>{set.id}</TableCell>
                                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                                    <TextField
                                        value={set.duration}
                                        sx={{ textAlign: 'center', '& input': { textAlign: 'center' } }}
                                        variant="standard"
                                        InputProps={{ inputProps: { min: 0 }, disableUnderline: true }}
                                        onChange={(e) => handleRowEdit({ ...set, duration: e.target.value }, exercise)}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                                    <TextField
                                        type="number"
                                        value={set.distance}
                                        sx={{ textAlign: 'center', '& input': { textAlign: 'center' } }}
                                        variant="standard"
                                        InputProps={{ inputProps: { min: 0 }, disableUnderline: true }}
                                        onChange={(e) => handleRowEdit({ ...set, distance: e.target.value }, exercise)}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                                    <Button onClick={() => handleRemoveSet(set.id)}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ marginTop: 2 }}>
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
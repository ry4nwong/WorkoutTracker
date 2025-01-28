import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import React from "react";

const FinishWorkoutPopup = ({ workoutFinished, setWorkoutName, setWorkoutDescription, setWorkoutFinished, finishWorkout, workoutName, workoutDescription }) => {
    return (
        <Dialog open={workoutFinished} fullWidth maxWidth="md" sx={{ '& .MuiDialog-paper': { borderRadius: 4, padding: 3 } }}>
            <DialogTitle textAlign="center" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Finish Workout</DialogTitle>

            <DialogContent sx={{ marginBottom: 1 }}>
                <TextField
                    fullWidth
                    label="Workout Name"
                    onChange={(e) => setWorkoutName(e.target.value)}
                    required
                    value={workoutName}
                    variant="outlined"
                    sx={{ marginBottom: 2, marginTop: 1 }}
                />
                <TextField
                    fullWidth
                    label="Workout Description"
                    multiline
                    rows={4}
                    onChange={(e) => setWorkoutDescription(e.target.value)}
                    value={workoutDescription}
                    variant="outlined"
                />
            </DialogContent>

            <DialogContent>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={6}>
                        <Button 
                            fullWidth 
                            color="error" 
                            variant="outlined" 
                            onClick={() => setWorkoutFinished(false)}
                            sx={{ padding: 1.5, fontWeight: 'bold' }}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary"
                            onClick={finishWorkout}
                            sx={{ padding: 1.5, fontWeight: 'bold' }}
                            disabled={workoutName === ''}
                        >
                            Complete Workout
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )

};

export default FinishWorkoutPopup;
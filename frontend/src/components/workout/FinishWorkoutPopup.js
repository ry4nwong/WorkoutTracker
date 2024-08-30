import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import React from "react";

const FinishWorkoutPopup = ({ workoutFinished, setWorkoutName, setWorkoutDescription, setWorkoutFinished, finishWorkout, workoutName, workoutDescription }) => {
    return (
        <Dialog open={workoutFinished} fullWidth maxWidth="md">
            <DialogTitle textAlign='center'>Finish Workout</DialogTitle>
            <Box />
            <DialogContent>
                <TextField
                    fullWidth
                    label="Workout Name"
                    onChange={(e) => setWorkoutName(e.target.value)}
                    required
                    value={workoutName}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Workout Description"
                    multiline rows={4}
                    onChange={(e) => setWorkoutDescription(e.target.value)}
                    value={workoutDescription}
                />
            </DialogContent>
            <DialogContent>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>
                        <Button fullWidth color="error" onClick={() => setWorkoutFinished(false)}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button fullWidth variant='contained' onClick={finishWorkout}>Complete Workout</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )

};

export default FinishWorkoutPopup;
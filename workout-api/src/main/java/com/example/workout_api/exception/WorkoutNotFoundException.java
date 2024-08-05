package com.example.workout_api.exception;

public class WorkoutNotFoundException extends Exception {
    public WorkoutNotFoundException() {
        super("Workout not found!");
    }
}

package com.example.workout_api.payload.workout;

import java.util.List;

import com.example.workout_api.payload.exercise.ExerciseInput;

import lombok.Data;

@Data
public class WorkoutInput {
    private String workoutName;
    private String description;
    private String date;
    private Integer duration;
    private Double totalVolumePounds;
    private List<ExerciseInput> exercises;
}

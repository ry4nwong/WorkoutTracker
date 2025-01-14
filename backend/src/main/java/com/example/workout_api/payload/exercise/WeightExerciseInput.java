package com.example.workout_api.payload.exercise;

import java.util.List;

import com.example.workout_api.payload.set.WeightSetInput;

import lombok.Data;

@Data
public class WeightExerciseInput {
    private String id;
    private String exerciseName;
    private String description;
    private String muscleTargeted;
    private List<WeightSetInput> sets;
}

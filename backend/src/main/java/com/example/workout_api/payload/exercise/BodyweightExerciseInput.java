package com.example.workout_api.payload.exercise;

import java.util.List;

import com.example.workout_api.payload.set.BodyweightSetInput;

import lombok.Data;

@Data
public class BodyweightExerciseInput {
    private String id;
    private String exerciseName;
    private String description;
    private String muscleTargeted;
    private List<BodyweightSetInput> sets;
}

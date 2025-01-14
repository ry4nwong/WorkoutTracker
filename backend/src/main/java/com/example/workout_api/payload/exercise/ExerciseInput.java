package com.example.workout_api.payload.exercise;

import lombok.Data;

@Data
public class ExerciseInput {
    private ExerciseType exerciseType;
    private WeightExerciseInput weightExercise;
    private CardioExerciseInput cardioExercise;
    private BodyweightExerciseInput bodyweightExercise;
}

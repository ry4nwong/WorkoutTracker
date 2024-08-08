package com.example.workout_api.model.workout;

import java.util.List;

import lombok.Data;

@Data
public class WeightExercise extends Exercise {
    private String muscleTargeted;
    private List<WeightSet> sets;
}

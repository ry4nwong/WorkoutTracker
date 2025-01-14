package com.example.workout_api.model.exercise;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "exercises")
public class WeightExercise extends Exercise {
    private String muscleTargeted;
    private List<WeightSet> sets;

    public WeightExercise(String id, String exerciseName, String description, String muscleTargeted, List<WeightSet> sets) {
        super(id, exerciseName, description);
        this.muscleTargeted = muscleTargeted;
        this.sets = sets;
    }
}

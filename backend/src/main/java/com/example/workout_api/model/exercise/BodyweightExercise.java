package com.example.workout_api.model.exercise;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.example.workout_api.payload.exercise.ExerciseType;

import lombok.Data;

@Data
@Document(collection = "exercises")
public class BodyweightExercise extends Exercise {
    private String muscleTargeted;
    private List<BodyweightSet> sets;

    public BodyweightExercise(String id, ExerciseType exerciseType, String exerciseName, String description, String muscleTargeted, List<BodyweightSet> sets) {
        super(id, exerciseType, exerciseName, description);
        this.muscleTargeted = muscleTargeted;
        this.sets = sets;
    }
}

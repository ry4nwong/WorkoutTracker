package com.example.workout_api.model.exercise;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.example.workout_api.payload.exercise.ExerciseType;

import lombok.Data;

@Data
@Document(collection = "exercises")
public class CardioExercise extends Exercise {
    private List<CardioSet> sets;

    public CardioExercise(String id, ExerciseType exerciseType, String exerciseName, String description, List<CardioSet> sets) {
        super(id, exerciseType, exerciseName, description);
        this.sets = sets;
    }
}

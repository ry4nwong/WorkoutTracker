package com.example.workout_api.model.exercise;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "exercises")
public class CardioExercise extends Exercise {
    private List<CardioSet> sets;

    public CardioExercise(String id, String exerciseName, String description, List<CardioSet> sets) {
        super(id, exerciseName, description);
        this.sets = sets;
    }
}

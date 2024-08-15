package com.example.workout_api.model.exercise;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "exercises")
public class BodyweightExercise extends Exercise {
    private String muscleTargeted;
    private List<Integer> sets;
}

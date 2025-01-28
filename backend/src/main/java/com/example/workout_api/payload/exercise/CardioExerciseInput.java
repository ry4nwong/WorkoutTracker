package com.example.workout_api.payload.exercise;

import java.util.List;

import com.example.workout_api.payload.set.CardioSetInput;

import lombok.Data;

@Data
public class CardioExerciseInput {
    private String id;
    private String exerciseName;
    private String description;
    private List<CardioSetInput> sets;
}

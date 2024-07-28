package com.example.workout_api.model.workout;

import java.util.List;

import lombok.Data;

@Data
public class CardioExercise extends Exercise {
    private List<CardioSet> sets;
}

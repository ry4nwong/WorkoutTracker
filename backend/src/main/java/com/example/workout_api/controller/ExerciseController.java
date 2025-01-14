package com.example.workout_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.service.ExerciseService;

@Controller
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @QueryMapping
    public List<Exercise> allExercises() {
        return exerciseService.getAll();
    }
}

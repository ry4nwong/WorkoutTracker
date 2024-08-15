package com.example.workout_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.service.ExerciseService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/all")
    public ResponseEntity<?> getExercises() {
        return ResponseEntity.ok(exerciseService.getAll());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createExercise(@RequestBody Exercise newExercise) {
        return ResponseEntity.ok(exerciseService.addExercise(newExercise));
    }
    
}

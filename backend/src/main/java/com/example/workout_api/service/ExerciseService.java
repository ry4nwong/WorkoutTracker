package com.example.workout_api.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workout_api.model.exercise.CardioExercise;
import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.model.exercise.WeightExercise;
import com.example.workout_api.repository.ExerciseRepository;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<Exercise> getAll() {
        return exerciseRepository.findAll();
    }

    public Exercise addExercise(Exercise newExercise) {
        return exerciseRepository.save(newExercise);
    }
}

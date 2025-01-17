package com.example.workout_api.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.model.user.User;
import com.example.workout_api.payload.exercise.ExerciseType;
import com.example.workout_api.repository.ExerciseRepository;
import com.example.workout_api.repository.UserRepository;

@Component
public class MigrationRunner implements CommandLineRunner {

    private final ExerciseRepository exerciseRepository;

    public MigrationRunner(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Exercise> exercises = exerciseRepository.findAll();

        boolean updateNeeded = false;
        for (Exercise exercise : exercises) {
            String className = exercise.getClass().getSimpleName();
            ExerciseType exerciseType = null;

            if (className.equals("WeightExercise")) {
                exerciseType = ExerciseType.WEIGHT;
            } else if (className.equals("CardioExercise")) {
                exerciseType = ExerciseType.CARDIO;
            } else if (className.equals("BodyweightExercise")) {
                exerciseType = ExerciseType.BODYWEIGHT;
            }

            if (exerciseType != null && (exercise.getExerciseType() == null || !exercise.getExerciseType().equals(exerciseType))) {
                exercise.setExerciseType(exerciseType);
                updateNeeded = true;
            }
        }

        if (updateNeeded) {
            exerciseRepository.saveAll(exercises);
        }
    }
}

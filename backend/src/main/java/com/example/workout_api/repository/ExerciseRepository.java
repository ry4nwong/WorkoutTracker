package com.example.workout_api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.workout_api.model.exercise.Exercise;

@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    
}

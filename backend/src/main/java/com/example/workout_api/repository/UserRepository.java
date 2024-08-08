package com.example.workout_api.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.workout_api.model.user.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public Optional<User> findByUsername(String username);

    public Optional<User> findByEmail(String email);

    @Query("{ 'workouts.id': ?0 }")
    public Optional<User> findByWorkoutId(String workoutId);

    public boolean existsByUsername(String username);

    public boolean existsByEmail(String email);
}
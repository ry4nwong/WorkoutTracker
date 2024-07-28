package com.example.workout_api.repository;

import com.example.workout_api.model.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public Optional<User> findByUsername(String username);
    public Optional<User> findByEmail(String email);
}
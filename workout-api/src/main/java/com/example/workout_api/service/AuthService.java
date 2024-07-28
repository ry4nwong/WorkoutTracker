package com.example.workout_api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workout_api.model.User;
import com.example.workout_api.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User newUser) {
        return userRepository.save(newUser);
    }

    public Optional<User> verifyCredentials(String username, String password) {
        Optional<User> foundUser = userRepository.findByUsername(username);
        if(foundUser.isPresent() && foundUser.get().getPassword().equals(password)) {
            return foundUser;
        } else {
            return Optional.empty();
        }
    }
}

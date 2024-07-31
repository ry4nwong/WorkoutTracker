package com.example.workout_api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workout_api.exception.EmailAlreadyExistsException;
import com.example.workout_api.exception.InvalidCredentialsException;
import com.example.workout_api.exception.UsernameAlreadyExistsException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User newUser) throws Exception {
        if(userRepository.existsByUsername(newUser.getUsername())) {
            throw new UsernameAlreadyExistsException();
        } else if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new EmailAlreadyExistsException();
        }

        return userRepository.save(newUser);
    }

    public User verifyCredentials(String username, String password) throws Exception {
        Optional<User> foundUser = userRepository.findByUsername(username);
        if(foundUser.isPresent() && foundUser.get().getPassword().equals(password)) {
            return foundUser.get();
        } else {
            throw new InvalidCredentialsException();
        }
    }
}

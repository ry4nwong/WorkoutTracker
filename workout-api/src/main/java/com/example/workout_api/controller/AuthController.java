package com.example.workout_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workout_api.model.User;
import com.example.workout_api.payload.request.LoginRequest;
import com.example.workout_api.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User newUser) {
        return ResponseEntity.ok(userRepository.save(newUser));
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginRequest user) {
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
        if(foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
            // need to create cookie or generate token
            return ResponseEntity.ok(foundUser.get());
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
}
package com.example.workout_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workout_api.model.User;
import com.example.workout_api.payload.request.LoginRequest;
import com.example.workout_api.service.AuthService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User newUser) {
        return ResponseEntity.ok(authService.createUser(newUser));
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginRequest user) {
        Optional<User> verifiedUser = authService.verifyCredentials(user.getUsername(), user.getPassword());
        if(verifiedUser.isPresent()) {
            return ResponseEntity.ok(verifiedUser.get());
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
    
}
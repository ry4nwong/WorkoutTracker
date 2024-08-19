package com.example.workout_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workout_api.exception.EmailAlreadyExistsException;
import com.example.workout_api.exception.InvalidCredentialsException;
import com.example.workout_api.exception.UsernameAlreadyExistsException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.payload.request.LoginRequest;
import com.example.workout_api.payload.request.RegistrationRequest;
import com.example.workout_api.payload.response.LoginResponse;
import com.example.workout_api.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest newUser) throws Exception {
        User createdUser = null;
        try {
            createdUser = authService.createUser(newUser);
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

        return ResponseEntity.ok(new LoginResponse(createdUser));
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) throws Exception {
        User loggedUser = null;
        try {
            loggedUser = authService.verifyCredentials(loginRequest.getUsername(), loginRequest.getPassword());
        } catch(InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        
        return ResponseEntity.ok(new LoginResponse(loggedUser));
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable String username) {
        if(authService.usernameExists(username)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        if(authService.emailExists(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
}
package com.example.workout_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.service.UserService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(userService.getAll());
    }
    
    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User updatedUser) throws Exception {
        User userAfterUpdate = null;
        try {
            userAfterUpdate = userService.modifyUser(id, updatedUser);
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
        return ResponseEntity.ok(userAfterUpdate);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<?> findUserById(@PathVariable String id) throws Exception {
        User foundUser = null;
        try {
            foundUser = userService.findUserById(id);
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
        return ResponseEntity.ok(foundUser);
    }
    
    @GetMapping("/find/username/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable String username) throws Exception {
        User foundUser = null;
        try {
            foundUser = userService.findUserByUsername(username);
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
        return ResponseEntity.ok(foundUser);
    }
}

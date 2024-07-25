package com.example.workout_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workout_api.model.User;
import com.example.workout_api.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        User currentUser = userRepository.findById(id).orElse(null);
        if(updatedUser == null) {
            return ResponseEntity.notFound().build();
        }

        if (updatedUser.getUsername() != null) {
            currentUser.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getEmail() != null) {
            currentUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getPassword() != null) {
            currentUser.setPassword(updatedUser.getPassword());
        }
        if (updatedUser.getFirstName() != null) {
            currentUser.setFirstName(updatedUser.getFirstName());
        }
        if (updatedUser.getLastName() != null) {
            currentUser.setLastName(updatedUser.getLastName());
        }

        return ResponseEntity.ok(userRepository.save(currentUser));
    }
}

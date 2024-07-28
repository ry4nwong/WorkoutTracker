package com.example.workout_api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workout_api.model.User;
import com.example.workout_api.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> modifyUser(String id, User updatedUser) {
        User currentUser = userRepository.findById(id).orElse(null);
        if (currentUser == null) {
            return Optional.empty();
        }

        if (updatedUser.getUsername() != null)
            currentUser.setUsername(updatedUser.getUsername());
        if (updatedUser.getEmail() != null)
            currentUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null)
            currentUser.setPassword(updatedUser.getPassword());
        if (updatedUser.getFirstName() != null)
            currentUser.setFirstName(updatedUser.getFirstName());
        if (updatedUser.getLastName() != null)
            currentUser.setLastName(updatedUser.getLastName());

        return Optional.of(userRepository.save(currentUser));
    }
}

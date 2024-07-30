package com.example.workout_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User modifyUser(String id, User updatedUser) throws Exception {
        User currentUser = userRepository.findById(id).orElse(null);
        if (currentUser == null) {
            throw new UserNotFoundException();
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

        return userRepository.save(currentUser);
    }

    public User findUserByUsername(String username) throws Exception {
        User foundUser = userRepository.findByUsername(username).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        return foundUser;
    }

    public User findUserById(String id) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        return foundUser;
    }
}

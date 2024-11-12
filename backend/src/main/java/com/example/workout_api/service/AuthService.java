package com.example.workout_api.service;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workout_api.exception.EmailAlreadyExistsException;
import com.example.workout_api.exception.InvalidCredentialsException;
import com.example.workout_api.exception.UsernameAlreadyExistsException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.payload.request.RegistrationRequest;
import com.example.workout_api.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(RegistrationRequest newUser) throws Exception {
        if(userRepository.existsByUsername(newUser.getUsername())) {
            throw new UsernameAlreadyExistsException();
        } else if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
        
        newUser.setPassword(BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt()));
        return userRepository.save(new User(newUser));
    }

    public User verifyCredentials(String username, String password) throws Exception {
        Optional<User> foundUser = userRepository.findByUsername(username);
        if(foundUser.isPresent() && BCrypt.checkpw(password, foundUser.get().getPassword())) {
            return foundUser.get();
        } else {
            throw new InvalidCredentialsException();
        }
    }

    public boolean usernameExists(String username) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        return existingUser.isPresent();
    }

    public boolean emailExists(String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        return existingUser.isPresent();
    }
}

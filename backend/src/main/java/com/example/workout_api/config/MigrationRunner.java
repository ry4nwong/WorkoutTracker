package com.example.workout_api.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.workout_api.model.user.User;
import com.example.workout_api.repository.UserRepository;

@Component
public class MigrationRunner implements CommandLineRunner {
    
    private final UserRepository userRepository;

    public MigrationRunner(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<User> users = userRepository.findAll();

        boolean updateNeeded = false;
        for (User user : users) {
            // Set Biography if null
            if (user.getBiography() == null) {
                user.setBiography("");
                updateNeeded = true;
            }
        }

        if (updateNeeded) {
            userRepository.saveAll(users);
        }
    }
}

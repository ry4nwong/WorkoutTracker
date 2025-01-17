package com.example.workout_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.exception.WorkoutNotFoundException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.model.workout.Workout;
import com.example.workout_api.payload.workout.WorkoutInput;
import com.example.workout_api.repository.UserRepository;

@Service
public class WorkoutService {
    @Autowired
    private UserRepository userRepository;

    public Workout createWorkout(String userId, WorkoutInput workoutInput) throws Exception {
        User currentUser = userRepository.findById(userId).orElse(null);
        if (currentUser == null) {
            throw new UserNotFoundException();
        }

        Workout newWorkout = new Workout(currentUser.getUsername(), workoutInput);
        currentUser.getWorkouts().add(newWorkout);
        userRepository.save(currentUser);
        return newWorkout;
    }

    public Workout modifyWorkout(String workoutId, WorkoutInput workoutInput) throws Exception {
        User currentUser = userRepository.findByWorkoutId(workoutId).orElse(null);
        if (currentUser != null) {
            for (int i = 0; i < currentUser.getWorkouts().size(); i++) {
                Workout workout = currentUser.getWorkouts().get(i);
                if (workout.getId().equals(workoutId)) {
                    Workout newWorkout = new Workout(currentUser.getUsername(), workoutInput);
                    currentUser.getWorkouts().set(i, newWorkout);
                    userRepository.save(currentUser);
                    return newWorkout;
                }
            }

            throw new WorkoutNotFoundException();
        }

        throw new UserNotFoundException();
    }

    public boolean deleteWorkout(String workoutId) {
        User currentUser = userRepository.findByWorkoutId(workoutId).orElse(null);
        if (currentUser != null) {
            boolean removed = currentUser.getWorkouts().removeIf(workout -> workout.getId().equals(workoutId));
            if (removed) {
                userRepository.save(currentUser);
                return true;
            }
        }

        return false;
    }

    public Workout findWorkout(String workoutId) throws Exception {
        User currentUser = userRepository.findByWorkoutId(workoutId).orElse(null);
        if (currentUser != null) {
            for (int i = 0; i < currentUser.getWorkouts().size(); i++) {
                Workout workout = currentUser.getWorkouts().get(i);
                if (workout.getId().equals(workoutId)) {
                    return workout;
                }
            }

            throw new WorkoutNotFoundException();
        }

        throw new UserNotFoundException();
    }

    public List<Workout> findAllWorkouts(String id) throws Exception {
        User currentUser = userRepository.findById(id).orElse(null);
        if (currentUser == null) {
            throw new UserNotFoundException();
        }

        return currentUser.getWorkouts();
    }
}

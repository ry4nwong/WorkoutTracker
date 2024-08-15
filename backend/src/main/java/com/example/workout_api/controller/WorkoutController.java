package com.example.workout_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.exception.WorkoutNotFoundException;
import com.example.workout_api.model.workout.Workout;
import com.example.workout_api.service.WorkoutService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;


@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    @Autowired
    public WorkoutService workoutService;

    @PostMapping("/create/{username}")
    public ResponseEntity<?> createWorkout(@PathVariable String username, @RequestBody Workout workoutRequest) throws Exception {
        Workout workout = null;
        try {
            workout = workoutService.createWorkout(username, workoutRequest);
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
        return ResponseEntity.ok(workout);
    }

    @PatchMapping("/update/{workoutId}")
    public ResponseEntity<?> modifyWorkout(@PathVariable String workoutId, @RequestBody Workout workoutRequest) throws Exception {
        Workout workout = null;
        try {
            workout = workoutService.modifyWorkout(workoutId, workoutRequest);
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch(WorkoutNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
        return ResponseEntity.ok(workout);
    }

    @DeleteMapping("/delete/{workoutId}")
    public ResponseEntity<?> deleteWorkout(@PathVariable String workoutId) {
        return workoutService.deleteWorkout(workoutId) ? ResponseEntity.status(HttpStatus.OK).build()
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/get/{workoutId}")
    public ResponseEntity<?> getWorkout(@PathVariable String workoutId) throws Exception {
        Workout workout = null;
        try {
            workout = workoutService.findWorkout(workoutId);
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch(WorkoutNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
        return ResponseEntity.ok(workout);
    }

    @GetMapping("/all/{username}")
    public ResponseEntity<?> getAllWorkouts(@PathVariable String username) throws Exception {
        List<Workout> workout = null;
        try {
            workout = workoutService.findAllWorkouts(username);
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        
        return ResponseEntity.ok(workout);
    }
}

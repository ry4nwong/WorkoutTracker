package com.example.workout_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.workout_api.model.workout.Workout;
import com.example.workout_api.payload.workout.WorkoutInput;
import com.example.workout_api.service.WorkoutService;

@Controller
public class WorkoutController {
    @Autowired
    public WorkoutService workoutService;

    @QueryMapping
    public Workout getWorkout(@Argument String workoutId) throws Exception {
        return workoutService.findWorkout(workoutId);
    }

    @QueryMapping
    public List<Workout> getAllWorkouts(@Argument String userId) throws Exception {
        return workoutService.findAllWorkouts(userId);
    }

    @MutationMapping
    public Workout createWorkout(@Argument String userId, @Argument WorkoutInput workoutInput) throws Exception {
        System.out.println(workoutInput);
        return workoutService.createWorkout(userId, workoutInput);
    }

    @MutationMapping
    public Workout modifyWorkout(@Argument String workoutId, @Argument WorkoutInput workoutInput) throws Exception {
        return workoutService.modifyWorkout(workoutId, workoutInput);
    }

    @MutationMapping
    public boolean deleteWorkout(@Argument String workoutId) throws Exception {
        return workoutService.deleteWorkout(workoutId);
    }
}

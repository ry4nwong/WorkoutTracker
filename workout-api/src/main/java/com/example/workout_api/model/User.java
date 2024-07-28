package com.example.workout_api.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.workout_api.model.workout.Workout;

import lombok.Data;

@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private List<Workout> workouts;
}

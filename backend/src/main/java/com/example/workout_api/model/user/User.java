package com.example.workout_api.model.user;

import java.util.LinkedList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.workout_api.model.workout.Workout;
import com.example.workout_api.payload.user.UserInput;

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
    private Units units;
    private BodyData bodyData;
    private String biography;
    private Boolean isPrivateAccount;

    public User(UserInput newUser) {
        this.username = newUser.getUsername();
        this.email = newUser.getEmail();
        this.password = newUser.getPassword();
        this.firstName = newUser.getFirstName();
        this.lastName = newUser.getLastName();
        this.workouts = new LinkedList<>();
        this.units = new Units();
        this.bodyData = new BodyData();
        this.biography = "";
        this.isPrivateAccount = false;
    }

    public User() {
        this.username = null;
        this.email = null;
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        this.workouts = null;
        this.units = null;
        this.biography = null;
        this.isPrivateAccount = false;
    }
}

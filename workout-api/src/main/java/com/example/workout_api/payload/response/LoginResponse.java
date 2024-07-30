package com.example.workout_api.payload.response;

import com.example.workout_api.model.user.User;

import lombok.Getter;

@Getter
public class LoginResponse {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;

    public LoginResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
    }
}

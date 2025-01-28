package com.example.workout_api.payload.user;

import lombok.Data;

@Data
public class UserInput {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}

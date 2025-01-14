package com.example.workout_api.payload.user;

import lombok.Data;

@Data
public class ProfileInput {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String biography;
}

package com.example.workout_api.payload.request;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}

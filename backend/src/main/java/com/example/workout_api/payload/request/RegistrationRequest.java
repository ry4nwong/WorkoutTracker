package com.example.workout_api.payload.request;

import com.example.workout_api.model.user.BodyData;
import com.example.workout_api.model.user.UserPreferences;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private UserPreferences userPreferences;
    private BodyData bodyData;
}

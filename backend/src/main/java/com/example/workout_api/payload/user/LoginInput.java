package com.example.workout_api.payload.user;

import lombok.Data;

@Data
public class LoginInput {
    private String username;
    private String password;
}

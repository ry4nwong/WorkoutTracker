package com.example.workout_api.exception;

public class UserNotFoundException extends Exception {
    public UserNotFoundException() {
        super("User not found!");
    }
}

package com.example.workout_api.exception;

public class UserNotFoundException extends Exception {
    public UserNotFoundException() {
        super("User not found!");
    }

    public UserNotFoundException(Throwable cause) {
        super("User not found!", cause);
    }
}

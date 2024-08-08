package com.example.workout_api.exception;

public class UsernameAlreadyExistsException extends Exception {
    public UsernameAlreadyExistsException() {
        super("Username already exists!");
    }
}

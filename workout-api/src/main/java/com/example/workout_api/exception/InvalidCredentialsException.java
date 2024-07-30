package com.example.workout_api.exception;

public class InvalidCredentialsException extends Exception {
    public InvalidCredentialsException() {
        super("Invalid Credentials!");
    }

    public InvalidCredentialsException(Throwable cause) {
        super("Invalid Credentials!", cause);
    }
}

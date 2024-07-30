package com.example.workout_api.exception;

public class EmailAlreadyExistsException extends Exception {
    public EmailAlreadyExistsException() {
        super("Email already exists!");
    }

    public EmailAlreadyExistsException(Throwable cause) {
        super("Email already exists!", cause);
    }
}

package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.workout_api.exception.EmailAlreadyExistsException;
import com.example.workout_api.exception.InvalidCredentialsException;
import com.example.workout_api.exception.UsernameAlreadyExistsException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.payload.request.LoginRequest;
import com.example.workout_api.repository.UserRepository;
import com.example.workout_api.service.AuthService;

public class AuthServiceTest {
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private AuthService authService;

    private LoginRequest loginRequest;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("password");

        user = new User();
        user.setId("12345678");
        user.setUsername("testuser");
        user.setEmail("test@test.com");
        user.setPassword("password");
    }

    @Test
    void testCreateUser() throws Exception {
        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@test.com")).thenReturn(false);

        User createdUser = authService.createUser(user);
        assertEquals("12345678", createdUser.getId());
        assertEquals("testuser", createdUser.getUsername());
    }

    @Test
    void testCreateUserInvalidUsername() throws Exception {
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        assertThrows(UsernameAlreadyExistsException.class, () -> authService.createUser(user));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testCreateUserInvalidEmail() throws Exception {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@test.com")).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> authService.createUser(user));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testVerifyCredentials() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        User verifiedUser = authService.verifyCredentials(loginRequest.getUsername(), loginRequest.getPassword());
        assertEquals("12345678", verifiedUser.getId());
        assertEquals("testuser", verifiedUser.getUsername());
    }

    @Test
    void testVerifyCredentialsInvalidUsername() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, () -> authService.verifyCredentials(loginRequest.getUsername(), loginRequest.getPassword()));
    }

    @Test
    void testVerifyCredentialsInvalidPassword() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        assertThrows(InvalidCredentialsException.class, () -> authService.verifyCredentials(loginRequest.getUsername(), "incorrectpassword"));
    }
}

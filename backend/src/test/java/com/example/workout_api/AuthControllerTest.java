package com.example.workout_api;

import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.workout_api.controller.AuthController;
import com.example.workout_api.exception.EmailAlreadyExistsException;
import com.example.workout_api.exception.InvalidCredentialsException;
import com.example.workout_api.exception.UsernameAlreadyExistsException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.payload.request.LoginRequest;
import com.example.workout_api.payload.request.RegistrationRequest;
import com.example.workout_api.payload.response.LoginResponse;
import com.example.workout_api.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private AuthController authController;

    @MockBean
    private AuthService authService;

    private User user;
    private RegistrationRequest newUser;
    private LoginRequest loginRequest;
    private LoginResponse loginResponse;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId("12345678");
        user.setUsername("testuser");
        user.setPassword("password");

        newUser = new RegistrationRequest();
        newUser.setUsername("testuser");
        newUser.setPassword("password");

        loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("password");

        loginResponse = new LoginResponse(user);

        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testRegisterUser() throws Exception {
        when(authService.createUser(newUser)).thenReturn(user);
        mockMvc.perform(post("/api/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newUser)))
            .andExpect(status().isOk())
            .andExpect(content().json(objectMapper.writeValueAsString(loginResponse)));
    }

    @Test
    void testRegisterUserInvalidUsername() throws Exception {
        when(authService.createUser(newUser)).thenThrow(UsernameAlreadyExistsException.class);
        mockMvc.perform(post("/api/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newUser)))
            .andExpect(status().isConflict());
    }

    @Test
    void testRegisterUserInvalidEmail() throws Exception {
        when(authService.createUser(newUser)).thenThrow(EmailAlreadyExistsException.class);
        mockMvc.perform(post("/api/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newUser)))
            .andExpect(status().isConflict());
    }

    @Test
    void testLoginUser() throws Exception {
        when(authService.verifyCredentials(loginRequest.getUsername(), loginRequest.getPassword())).thenReturn(user);
        mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(loginRequest)))
            .andExpect(status().isOk())
            .andExpect(content().json(objectMapper.writeValueAsString(loginResponse)));
    }

    @Test
    void testLoginUserInvalidCredentials() throws Exception {
        when(authService.verifyCredentials(loginRequest.getUsername(), loginRequest.getPassword())).thenThrow(InvalidCredentialsException.class);
        mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(loginRequest)))
            .andExpect(status().isUnauthorized());
    }
}

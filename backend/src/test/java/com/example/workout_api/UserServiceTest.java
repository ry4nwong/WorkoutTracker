package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.repository.UserRepository;
import com.example.workout_api.service.UserService;

public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;
    private User updatedUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId("12345678");
        user.setUsername("testuser");
        user.setFirstName("Test");

        updatedUser = new User();
        updatedUser.setId("12345678");
        updatedUser.setUsername("updateduser");
        updatedUser.setPassword("password");
        updatedUser.setEmail("test@test.com");
        updatedUser.setFirstName("Updated");
        updatedUser.setLastName("User");
    }

    @Test
    void testFindUserById() throws Exception {
        when(userRepository.findById("12345678")).thenReturn(Optional.of(user));
        User foundUser = userService.findUserById("12345678");
        assertEquals("testuser", foundUser.getUsername());
    }

    @Test
    void testFindUserByIdNotFound() throws Exception {
        when(userRepository.findById("1")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.findUserById("1"));
    }

    @Test
    void testFindUserByUsername() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        User foundUser = userService.findUserByUsername("testuser");
        assertEquals("testuser", foundUser.getUsername());
    }

    @Test
    void testFindUserByUsernameNotFound() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.findUserByUsername("testuser"));
    }

    @Test
    void testModifyUser() throws Exception {
        when(userRepository.findById("12345678")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);
        User result = userService.modifyUser(user.getId(), updatedUser);

        assertEquals("updateduser", result.getUsername());
        assertEquals("Updated", result.getFirstName());
    }

    @Test
    void testModifyUserInvalidId() throws Exception {
        when(userRepository.findById("12345678")).thenReturn(Optional.empty());
        
        assertThrows(UserNotFoundException.class, () -> userService.modifyUser("12345678", updatedUser));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testFindAll() {
        List<User> allUsers = new LinkedList<>();
        allUsers.add(user);
        allUsers.add(updatedUser);
        when(userRepository.findAll()).thenReturn(allUsers);

        assertEquals(2, userService.getAll().size());
    }
}

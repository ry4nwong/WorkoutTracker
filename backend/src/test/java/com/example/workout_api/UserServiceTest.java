package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mindrot.jbcrypt.BCrypt;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.workout_api.exception.EmailAlreadyExistsException;
import com.example.workout_api.exception.InvalidCredentialsException;
import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.exception.UsernameAlreadyExistsException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.payload.user.BodyDataInput;
import com.example.workout_api.payload.user.LoginInput;
import com.example.workout_api.payload.user.ProfileInput;
import com.example.workout_api.payload.user.UnitsInput;
import com.example.workout_api.payload.user.UserInput;
import com.example.workout_api.repository.UserRepository;
import com.example.workout_api.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User mockUser;
    
    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId("user123");
        mockUser.setUsername("testUser");
        mockUser.setEmail("test@domain.com");
        mockUser.setPassword(BCrypt.hashpw("secret", BCrypt.gensalt()));
    }

    // Create User
    @Test
    void testCreateUser_Success() throws Exception {
        UserInput newUser = new UserInput();
        newUser.setUsername("newUser");
        newUser.setEmail("new@domain.com");
        newUser.setPassword("password123");

        when(userRepository.existsByUsername("newUser")).thenReturn(false);
        when(userRepository.existsByEmail("new@domain.com")).thenReturn(false);

        User savedUser = new User(newUser);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        User result = userService.createUser(newUser);
        assertNotNull(result);
        verify(userRepository).existsByUsername("newUser");
        verify(userRepository).existsByEmail("new@domain.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testCreateUser_UsernameAlreadyExists() {
        UserInput newUser = new UserInput();
        newUser.setUsername("testUser");
        newUser.setEmail("unique@domain.com");

        when(userRepository.existsByUsername("testUser")).thenReturn(true);

        assertThrows(UsernameAlreadyExistsException.class, () -> userService.createUser(newUser));
        verify(userRepository).existsByUsername("testUser");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testCreateUser_EmailAlreadyExists() {
        UserInput newUser = new UserInput();
        newUser.setUsername("uniqueUsername");
        newUser.setEmail("test@domain.com");

        when(userRepository.existsByUsername("uniqueUsername")).thenReturn(false);
        when(userRepository.existsByEmail("test@domain.com")).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> userService.createUser(newUser));
        verify(userRepository).existsByUsername("uniqueUsername");
        verify(userRepository).existsByEmail("test@domain.com");
        verify(userRepository, never()).save(any(User.class));
    }

    // Login
    @Test
    void testVerifyCredentials_Success() throws Exception {
        LoginInput loginInput = new LoginInput();
        loginInput.setUsername("testUser");
        loginInput.setPassword("secret");

        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(mockUser));

        User result = userService.verifyCredentials(loginInput);
        assertEquals("user123", result.getId());
        verify(userRepository).findByUsername("testUser");
    }

    @Test
    void testVerifyCredentials_UserNotFound() {
        LoginInput loginInput = new LoginInput();
        loginInput.setUsername("noSuchUser");
        loginInput.setPassword("secret");

        when(userRepository.findByUsername("noSuchUser")).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, () -> userService.verifyCredentials(loginInput));
        verify(userRepository).findByUsername("noSuchUser");
    }

    @Test
    void testVerifyCredentials_PasswordMismatch() {
        LoginInput loginInput = new LoginInput();
        loginInput.setUsername("testUser");
        loginInput.setPassword("wrongPassword");

        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(mockUser));

        assertThrows(InvalidCredentialsException.class, () -> userService.verifyCredentials(loginInput));
        verify(userRepository).findByUsername("testUser");
    }

    // Username Exists
    @Test
    void testUsernameExists_True() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(mockUser));
        boolean exists = userService.usernameExists("testUser");
        assertTrue(exists);
    }

    @Test
    void testUsernameExists_False() {
        when(userRepository.findByUsername("noSuchUser")).thenReturn(Optional.empty());
        boolean exists = userService.usernameExists("noSuchUser");
        assertFalse(exists);
    }

    // Email exists
    @Test
    void testEmailExists_True() {
        when(userRepository.findByEmail("test@domain.com")).thenReturn(Optional.of(mockUser));
        boolean exists = userService.emailExists("test@domain.com");
        assertTrue(exists);
    }

    @Test
    void testEmailExists_False() {
        when(userRepository.findByEmail("noSuch@domain.com")).thenReturn(Optional.empty());
        boolean exists = userService.emailExists("noSuch@domain.com");
        assertFalse(exists);
    }

    // Get all users
    @Test
    void testGetAll() {
        List<User> mockList = new ArrayList<>();
        mockList.add(mockUser);
        when(userRepository.findAll()).thenReturn(mockList);

        List<User> result = userService.getAll();
        assertEquals(1, result.size());
        assertEquals(mockUser, result.get(0));
        verify(userRepository).findAll();
    }

    // Find by username
    @Test
    void testFindUserByUsername_Success() throws Exception {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(mockUser));
        User result = userService.findUserByUsername("testUser");
        assertEquals("user123", result.getId());
        verify(userRepository).findByUsername("testUser");
    }

    @Test
    void testFindUserByUsername_NotFound() {
        when(userRepository.findByUsername("noUser")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.findUserByUsername("noUser"));
        verify(userRepository).findByUsername("noUser");
    }

    // Find user by id
    @Test
    void testFindUserById_Success() throws Exception {
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        User result = userService.findUserById("user123");
        assertEquals("testUser", result.getUsername());
        verify(userRepository).findById("user123");
    }

    @Test
    void testFindUserById_NotFound() {
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.findUserById("noId"));
        verify(userRepository).findById("noId");
    }

    // Update units
    @Test
    void testUpdateUnits_Success() throws Exception {
        UnitsInput unitsInput = new UnitsInput(true, true, true);
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User result = userService.updateUnits("user123", unitsInput);
        assertNotNull(result);
        verify(userRepository).findById("user123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateUnits_UserNotFound() {
        UnitsInput unitsInput = new UnitsInput(true, true, true);
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.updateUnits("noId", unitsInput));
    }

    // Update profile
    @Test
    void testUpdateProfile_Success() throws Exception {
        ProfileInput profileInput = new ProfileInput();
        profileInput.setFirstName("John");
        profileInput.setLastName("Doe");
        profileInput.setUsername("johnDoe");
        profileInput.setEmail("john@domain.com");
        profileInput.setBiography("Bio here");

        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User result = userService.updateProfile("user123", profileInput);
        assertNotNull(result);
        verify(userRepository).findById("user123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateProfile_UserNotFound() {
        ProfileInput profileInput = new ProfileInput();
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.updateProfile("noId", profileInput));
    }

    // Update body data
    @Test
    void testUpdateBodyData_Success() throws Exception {
        BodyDataInput bodyDataInput = new BodyDataInput();
        bodyDataInput.setHeight(180.5);
        bodyDataInput.setWeight(80.2);

        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User result = userService.updateBodyData("user123", bodyDataInput);
        assertNotNull(result);
        verify(userRepository).findById("user123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateBodyData_UserNotFound() {
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        BodyDataInput bodyDataInput = new BodyDataInput();
        assertThrows(UserNotFoundException.class, () -> userService.updateBodyData("noId", bodyDataInput));
    }

    // Delete user
    @Test
    void testDeleteUser_Success() {
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));

        boolean result = userService.deleteUser("user123");
        assertTrue(result);
        verify(userRepository).findById("user123");
        verify(userRepository).delete(mockUser);
    }

    @Test
    void testDeleteUser_UserNotFound() {
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        boolean result = userService.deleteUser("noId");
        assertFalse(result);
        verify(userRepository).findById("noId");
        verify(userRepository, never()).delete(any(User.class));
    }

    // Update email
    @Test
    void testUpdateEmail_Success() throws Exception {
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User result = userService.updateEmail("user123", "newEmail@domain.com");
        assertNotNull(result);
        verify(userRepository).findById("user123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateEmail_UserNotFound() {
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.updateEmail("noId", "someEmail@domain.com"));
    }

    // Update password
    @Test
    void testUpdatePassword_Success() throws Exception {
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User result = userService.updatePassword("user123", "newSecret");
        assertNotNull(result);
        verify(userRepository).findById("user123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdatePassword_UserNotFound() {
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.updatePassword("noId", "anyPass"));
    }

    // Update dark mode
    @Test
    void testUpdateDarkMode_Success() throws Exception {
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User result = userService.updateDarkMode("user123", true);
        assertNotNull(result);
        verify(userRepository).findById("user123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateDarkMode_UserNotFound() {
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.updateDarkMode("noId", false));
    }

    // Update private account
    @Test
    void testUpdatePrivateAccount_Success() throws Exception {
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User result = userService.updatePrivateAccount("user123", true);
        assertNotNull(result);
        verify(userRepository).findById("user123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdatePrivateAccount_UserNotFound() {
        when(userRepository.findById("noId")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.updatePrivateAccount("noId", true));
    }
}
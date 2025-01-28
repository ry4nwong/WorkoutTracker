package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.workout_api.controller.UserController;
import com.example.workout_api.model.user.User;
import com.example.workout_api.payload.user.BodyDataInput;
import com.example.workout_api.payload.user.LoginInput;
import com.example.workout_api.payload.user.ProfileInput;
import com.example.workout_api.payload.user.UnitsInput;
import com.example.workout_api.payload.user.UserInput;
import com.example.workout_api.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId("123");
        mockUser.setUsername("testUser");
    }

    // Registration testing
    @Test
    void testRegister_Success() throws Exception {
        UserInput userInput = new UserInput();
        userInput.setUsername("newUser");
        when(userService.createUser(userInput)).thenReturn(mockUser);

        User result = userController.register(userInput);
        assertNotNull(result);
        assertEquals("123", result.getId());
        verify(userService).createUser(userInput);
    }

    @Test
    void testRegister_Exception() throws Exception {
        UserInput userInput = new UserInput();
        when(userService.createUser(userInput)).thenThrow(new Exception("Register error"));

        assertThrows(Exception.class, () -> userController.register(userInput));
        verify(userService).createUser(userInput);
    }

    // Login testing
    @Test
    void testLogin_Success() throws Exception {
        LoginInput loginInput = new LoginInput();
        loginInput.setUsername("testUser");
        loginInput.setPassword("secret");
        when(userService.verifyCredentials(loginInput)).thenReturn(mockUser);

        User result = userController.login(loginInput);
        assertEquals("123", result.getId());
        verify(userService).verifyCredentials(loginInput);
    }

    @Test
    void testLogin_Exception() throws Exception {
        LoginInput loginInput = new LoginInput();
        when(userService.verifyCredentials(loginInput)).thenThrow(new Exception("Login failed"));

        assertThrows(Exception.class, () -> userController.login(loginInput));
        verify(userService).verifyCredentials(loginInput);
    }

    // Profile updates
    @Test
    void testUpdateProfileInfo_Success() throws Exception {
        ProfileInput profileInput = new ProfileInput();
        when(userService.updateProfile("123", profileInput)).thenReturn(mockUser);

        User result = userController.updateProfileInfo("123", profileInput);
        assertEquals("testUser", result.getUsername());
        verify(userService).updateProfile("123", profileInput);
    }

    @Test
    void testUpdateProfileInfo_Exception() throws Exception {
        ProfileInput profileInput = new ProfileInput();
        when(userService.updateProfile("123", profileInput)).thenThrow(new Exception("Profile error"));

        assertThrows(Exception.class, () -> userController.updateProfileInfo("123", profileInput));
        verify(userService).updateProfile("123", profileInput);
    }

    // Unit updates
    @Test
    void testUpdateUnits_Success() throws Exception {
        UnitsInput unitsInput = new UnitsInput(true, true, true);
        when(userService.updateUnits("123", unitsInput)).thenReturn(mockUser);

        User result = userController.updateUnits("123", unitsInput);
        assertNotNull(result);
        verify(userService).updateUnits("123", unitsInput);
    }

    @Test
    void testUpdateUnits_Exception() throws Exception {
        UnitsInput unitsInput = new UnitsInput(true, true, true);
        when(userService.updateUnits("123", unitsInput)).thenThrow(new Exception("Units error"));

        assertThrows(Exception.class, () -> userController.updateUnits("123", unitsInput));
        verify(userService).updateUnits("123", unitsInput);
    }

    // Body data update
    @Test
    void testUpdateBodyData_Success() throws Exception {
        BodyDataInput bodyDataInput = new BodyDataInput();
        when(userService.updateBodyData("123", bodyDataInput)).thenReturn(mockUser);

        User result = userController.updateBodyData("123", bodyDataInput);
        assertNotNull(result);
        verify(userService).updateBodyData("123", bodyDataInput);
    }

    @Test
    void testUpdateBodyData_Exception() throws Exception {
        BodyDataInput bodyDataInput = new BodyDataInput();
        when(userService.updateBodyData("123", bodyDataInput)).thenThrow(new Exception("BodyData error"));

        assertThrows(Exception.class, () -> userController.updateBodyData("123", bodyDataInput));
        verify(userService).updateBodyData("123", bodyDataInput);
    }

    @Test
    void testDeleteUser() {
        when(userService.deleteUser("123")).thenReturn(true);

        boolean result = userController.delete("123");
        assertTrue(result);
        verify(userService).deleteUser("123");
    }

    // All users
    @Test
    void testAllUsers() {
        List<User> mockList = new ArrayList<>();
        mockList.add(mockUser);
        when(userService.getAll()).thenReturn(mockList);

        List<User> result = userController.allUsers();
        assertEquals(1, result.size());
        verify(userService).getAll();
    }

    // Single user
    @Test
    void testUserById_Success() throws Exception {
        when(userService.findUserById("123")).thenReturn(mockUser);

        User result = userController.user("123");
        assertEquals("testUser", result.getUsername());
        verify(userService).findUserById("123");
    }

    @Test
    void testUserById_Exception() throws Exception {
        when(userService.findUserById("999")).thenThrow(new Exception("User not found"));

        assertThrows(Exception.class, () -> userController.user("999"));
        verify(userService).findUserById("999");
    }

    // Find user by username
    @Test
    void testUserByUsername_Success() throws Exception {
        when(userService.findUserByUsername("testUser")).thenReturn(mockUser);

        User result = userController.userByUsername("testUser");
        assertEquals("123", result.getId());
        verify(userService).findUserByUsername("testUser");
    }

    @Test
    void testUserByUsername_Exception() throws Exception {
        when(userService.findUserByUsername("noSuchUser")).thenThrow(new Exception("Not found"));

        assertThrows(Exception.class, () -> userController.userByUsername("noSuchUser"));
        verify(userService).findUserByUsername("noSuchUser");
    }

    // Check if username exists
    @Test
    void testUsernameExists() {
        when(userService.usernameExists("testUser")).thenReturn(true);

        boolean exists = userController.usernameExists("testUser");
        assertTrue(exists);
        verify(userService).usernameExists("testUser");
    }

    // Check if email exists
    @Test
    void testEmailExists() {
        when(userService.emailExists("test@domain.com")).thenReturn(true);

        boolean exists = userController.emailExists("test@domain.com");
        assertTrue(exists);
        verify(userService).emailExists("test@domain.com");
    }

    // Update email
    @Test
    void testUpdateEmail_Success() throws Exception {
        when(userService.updateEmail("123", "new@domain.com")).thenReturn(mockUser);

        User result = userController.updateEmail("123", "new@domain.com");
        assertEquals("testUser", result.getUsername());
        verify(userService).updateEmail("123", "new@domain.com");
    }

    @Test
    void testUpdateEmail_Exception() throws Exception {
        when(userService.updateEmail("123", "bad@domain.com")).thenThrow(new Exception("Email error"));

        assertThrows(Exception.class, () -> userController.updateEmail("123", "bad@domain.com"));
        verify(userService).updateEmail("123", "bad@domain.com");
    }

    // Update password
    @Test
    void testUpdatePassword_Success() throws Exception {
        when(userService.updatePassword("123", "newSecret")).thenReturn(mockUser);

        User result = userController.updatePassword("123", "newSecret");
        assertNotNull(result);
        verify(userService).updatePassword("123", "newSecret");
    }

    @Test
    void testUpdatePassword_Exception() throws Exception {
        when(userService.updatePassword("123", "badSecret")).thenThrow(new Exception("Password error"));

        assertThrows(Exception.class, () -> userController.updatePassword("123", "badSecret"));
        verify(userService).updatePassword("123", "badSecret");
    }

    // Update dark mode
    @Test
    void testUpdateDarkMode_Success() throws Exception {
        when(userService.updateDarkMode("123", true)).thenReturn(mockUser);

        User result = userController.updateDarkMode("123", true);
        assertNotNull(result);
        verify(userService).updateDarkMode("123", true);
    }

    @Test
    void testUpdateDarkMode_Exception() throws Exception {
        when(userService.updateDarkMode("123", false)).thenThrow(new Exception("DarkMode error"));

        assertThrows(Exception.class, () -> userController.updateDarkMode("123", false));
        verify(userService).updateDarkMode("123", false);
    }

    // Update private account
    @Test
    void testUpdatePrivateAccount_Success() throws Exception {
        when(userService.updatePrivateAccount("123", true)).thenReturn(mockUser);

        User result = userController.updatePrivateAccount("123", true);
        assertNotNull(result);
        verify(userService).updatePrivateAccount("123", true);
    }

    @Test
    void testUpdatePrivateAccount_Exception() throws Exception {
        when(userService.updatePrivateAccount("123", false)).thenThrow(new Exception("PrivateAccount error"));

        assertThrows(Exception.class, () -> userController.updatePrivateAccount("123", false));
        verify(userService).updatePrivateAccount("123", false);
    }
}
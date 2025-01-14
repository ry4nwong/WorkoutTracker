package com.example.workout_api;

import static org.mockito.Mockito.when;

import java.util.LinkedList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.workout_api.controller.UserController;
import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

// @WebMvcTest(UserController.class)
// public class UserControllerTest {
//     private MockMvc mockMvc;

//     @InjectMocks
//     private UserController userController;

//     @MockBean
//     private UserService userService;

//     private User user;
//     private User updatedUser;
//     private ObjectMapper objectMapper;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//         user = new User();
//         user.setId("12345678");
//         user.setUsername("testuser");
//         user.setFirstName("Test");

//         updatedUser = new User();
//         updatedUser.setId("12345678");
//         updatedUser.setUsername("updateduser");
//         updatedUser.setFirstName("Updated");

//         mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
//         objectMapper = new ObjectMapper();
//     }

//     @Test
//     void testGetAllUsers() throws Exception {
//         List<User> allUsers = new LinkedList<>();
//         allUsers.add(user);
//         when(userService.getAll()).thenReturn(allUsers);
//         mockMvc.perform(get("/api/users/all")
//                 .contentType(MediaType.APPLICATION_JSON))
//                 .andExpect(status().isOk())
//                 .andExpect(content().json(objectMapper.writeValueAsString(allUsers)));
//     }

//     @Test
//     void testFindUserById() throws Exception {
//         when(userService.findUserById("12345678")).thenReturn(user);
//         mockMvc.perform(get("/api/users/find/id/12345678")
//                 .contentType(MediaType.APPLICATION_JSON))
//                 .andExpect(status().isOk())
//                 .andExpect(content().json(objectMapper.writeValueAsString(user)));
//     }

//     @Test
//     void testFindUserByIdNotFound() throws Exception {
//         when(userService.findUserById("12345678")).thenThrow(UserNotFoundException.class);
//         mockMvc.perform(get("/api/users/find/id/12345678")
//                 .contentType(MediaType.APPLICATION_JSON))
//                 .andExpect(status().isBadRequest());
//     }

//     @Test
//     void testFindUserByUsername() throws Exception {
//         when(userService.findUserByUsername("testuser")).thenReturn(user);
//         mockMvc.perform(get("/api/users/find/username/testuser")
//                 .contentType(MediaType.APPLICATION_JSON))
//                 .andExpect(status().isOk())
//                 .andExpect(content().json(objectMapper.writeValueAsString(user)));
//     }

//     @Test
//     void testFindUserByUsernameNotFound() throws Exception {
//         when(userService.findUserByUsername("testuser")).thenThrow(UserNotFoundException.class);
//         mockMvc.perform(get("/api/users/find/username/testuser")
//                 .contentType(MediaType.APPLICATION_JSON))
//                 .andExpect(status().isBadRequest());
//     }

//     @Test
//     void testUpdateUser() throws Exception {
//         when(userService.modifyUser("12345678", updatedUser)).thenReturn(updatedUser);
//         mockMvc.perform(patch("/api/users/update/12345678")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(updatedUser)))
//                 .andExpect(status().isOk())
//                 .andExpect(content().json(objectMapper.writeValueAsString(updatedUser)));
//     }

//     @Test
//     void testUpdateUserInvalidUsername() throws Exception {
//         when(userService.modifyUser("12345678", updatedUser)).thenThrow(UserNotFoundException.class);
//         mockMvc.perform(patch("/api/users/update/12345678")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(updatedUser)))
//                 .andExpect(status().isBadRequest());
//     }
// }

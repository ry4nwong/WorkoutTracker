package com.example.workout_api;

import static org.mockito.Mockito.when;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
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

import com.example.workout_api.controller.WorkoutController;
import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.exception.WorkoutNotFoundException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.model.workout.CardioExercise;
import com.example.workout_api.model.workout.WeightExercise;
import com.example.workout_api.model.workout.Workout;
import com.example.workout_api.service.WorkoutService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(WorkoutController.class)
public class WorkoutControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private WorkoutController workoutController;

    @MockBean
    private WorkoutService workoutService;

    private User user;
    private Workout workout;
    private Workout updatedWorkout;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId("12345678");
        user.setUsername("testuser");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setWorkouts(new ArrayList<>());

        workout = new Workout("Test Workout", 130, 15000, new ArrayList<WeightExercise>(), new ArrayList<CardioExercise>());
        workout.setId("1");

        updatedWorkout = new Workout("Updated Workout", 145, 19000, new ArrayList<WeightExercise>(), new ArrayList<CardioExercise>());
        updatedWorkout.setId("1");

        mockMvc = MockMvcBuilders.standaloneSetup(workoutController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testCreateWorkout() throws Exception {
        when(workoutService.createWorkout("testuser", workout)).thenReturn(workout);
        mockMvc.perform(post("/api/workouts/create/testuser")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(workout)))
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(workout)));
    }

    @Test
    void testCreateWorkoutNotFound() throws Exception {
        when(workoutService.createWorkout("testuser", workout)).thenThrow(UserNotFoundException.class);
        mockMvc.perform(post("/api/workouts/create/testuser")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(workout)))
        .andExpect(status().isBadRequest());
    }

    @Test
    void testModifyWorkout() throws Exception {
        when(workoutService.modifyWorkout("1", updatedWorkout)).thenReturn(updatedWorkout);
        mockMvc.perform(patch("/api/workouts/update/1")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updatedWorkout)))
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(updatedWorkout)));
    }

    @Test
    void testModifyWorkoutInvalidUsername() throws Exception {
        when(workoutService.modifyWorkout("1", updatedWorkout)).thenThrow(UserNotFoundException.class);
        mockMvc.perform(patch("/api/workouts/update/1")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updatedWorkout)))
        .andExpect(status().isBadRequest());
    }

    @Test
    void testModifyWorkoutInvalidWorkoutId() throws Exception {
        when(workoutService.modifyWorkout("1", updatedWorkout)).thenThrow(WorkoutNotFoundException.class);
        mockMvc.perform(patch("/api/workouts/update/1")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updatedWorkout)))
        .andExpect(status().isBadRequest());
    }

    @Test
    void testDeleteWorkout() throws Exception {
        when(workoutService.deleteWorkout("1")).thenReturn(true);
        mockMvc.perform(delete("/api/workouts/delete/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
    }

    @Test
    void testDeleteWorkoutFailed() throws Exception {
        when(workoutService.deleteWorkout("1")).thenReturn(false);
        mockMvc.perform(delete("/api/workouts/delete/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
    }

    @Test
    void testGetWorkout() throws Exception {
        when(workoutService.findWorkout("1")).thenReturn(workout);
        mockMvc.perform(get("/api/workouts/get/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(workout)));
    }

    @Test
    void testGetWorkoutInvalidUsername() throws Exception {
        when(workoutService.findWorkout("1")).thenThrow(UserNotFoundException.class);
        mockMvc.perform(get("/api/workouts/get/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
    }

    @Test
    void testGetWorkoutInvalidWorkoutId() throws Exception {
        when(workoutService.findWorkout("1")).thenThrow(WorkoutNotFoundException.class);
        mockMvc.perform(get("/api/workouts/get/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
    }

    @Test
    void testGetAllWorkouts() throws Exception {
        when(workoutService.findAllWorkouts("testuser")).thenReturn(user.getWorkouts());
        mockMvc.perform(get("/api/workouts/all/testuser")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(user.getWorkouts())));
    }

    @Test
    void testGetAllWorkoutsInvalidUsername() throws Exception {
        when(workoutService.findAllWorkouts("testuser")).thenThrow(UserNotFoundException.class);
        mockMvc.perform(get("/api/workouts/all/testuser")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
    }
}

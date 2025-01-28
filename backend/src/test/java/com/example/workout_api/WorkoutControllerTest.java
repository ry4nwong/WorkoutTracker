package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.workout_api.controller.WorkoutController;
import com.example.workout_api.model.workout.Workout;
import com.example.workout_api.payload.workout.WorkoutInput;
import com.example.workout_api.service.WorkoutService;

@ExtendWith(MockitoExtension.class)
class WorkoutControllerTest {

    @Mock
    private WorkoutService workoutService;

    @InjectMocks
    private WorkoutController workoutController;

    private Workout mockWorkout;

    @BeforeEach
    void setUp() {
        mockWorkout = new Workout();
        mockWorkout.setId("workout123");
        mockWorkout.setWorkoutName("Mock Workout");
    }

    // Get workout
    @Test
    void testGetWorkout_Success() throws Exception {
        when(workoutService.findWorkout("workout123")).thenReturn(mockWorkout);

        Workout result = workoutController.getWorkout("workout123");

        assertNotNull(result);
        assertEquals("Mock Workout", result.getWorkoutName());
        verify(workoutService).findWorkout("workout123");
    }

    @Test
    void testGetWorkout_ThrowsException() throws Exception {
        when(workoutService.findWorkout("invalidId")).thenThrow(new Exception("Not Found"));

        assertThrows(Exception.class, () -> workoutController.getWorkout("invalidId"));
        verify(workoutService).findWorkout("invalidId");
    }

    // Get all workouts
    @Test
    void testGetAllWorkouts_Success() throws Exception {
        List<Workout> mockList = new ArrayList<>();
        mockList.add(mockWorkout);
        when(workoutService.findAllWorkouts("user123")).thenReturn(mockList);

        List<Workout> result = workoutController.getAllWorkouts("user123");

        assertEquals(1, result.size());
        assertEquals("Mock Workout", result.get(0).getWorkoutName());
        verify(workoutService).findAllWorkouts("user123");
    }

    @Test
    void testGetAllWorkouts_ThrowsException() throws Exception {
        when(workoutService.findAllWorkouts("badUserId")).thenThrow(new Exception("User not found"));

        assertThrows(Exception.class, () -> workoutController.getAllWorkouts("badUserId"));
        verify(workoutService).findAllWorkouts("badUserId");
    }

    // Create Workout
    @Test
    void testCreateWorkout_Success() throws Exception {
        WorkoutInput workoutInput = new WorkoutInput();
        workoutInput.setWorkoutName("New Workout");

        when(workoutService.createWorkout("user123", workoutInput)).thenReturn(mockWorkout);

        Workout result = workoutController.createWorkout("user123", workoutInput);

        assertNotNull(result);
        assertEquals("Mock Workout", result.getWorkoutName());
        verify(workoutService).createWorkout("user123", workoutInput);
    }

    @Test
    void testCreateWorkout_ThrowsException() throws Exception {
        WorkoutInput workoutInput = new WorkoutInput();
        workoutInput.setWorkoutName("Fail Workout");

        when(workoutService.createWorkout("user123", workoutInput))
            .thenThrow(new Exception("Create failed"));

        assertThrows(Exception.class, () -> workoutController.createWorkout("user123", workoutInput));
        verify(workoutService).createWorkout("user123", workoutInput);
    }

    // Modify workout
    @Test
    void testModifyWorkout_Success() throws Exception {
        WorkoutInput workoutInput = new WorkoutInput();
        workoutInput.setWorkoutName("Modified Title");

        when(workoutService.modifyWorkout("workout123", workoutInput)).thenReturn(mockWorkout);

        Workout result = workoutController.modifyWorkout("workout123", workoutInput);

        assertNotNull(result);
        assertEquals("Mock Workout", result.getWorkoutName());
        verify(workoutService).modifyWorkout("workout123", workoutInput);
    }

    @Test
    void testModifyWorkout_ThrowsException() throws Exception {
        WorkoutInput workoutInput = new WorkoutInput();
        workoutInput.setWorkoutName("Does not matter");

        when(workoutService.modifyWorkout("invalidWorkoutId", workoutInput))
            .thenThrow(new Exception("Modify failed"));

        assertThrows(Exception.class, () -> workoutController.modifyWorkout("invalidWorkoutId", workoutInput));
        verify(workoutService).modifyWorkout("invalidWorkoutId", workoutInput);
    }

    // Delete workout
    @Test
    void testDeleteWorkout_Success() throws Exception {
        when(workoutService.deleteWorkout("workout123")).thenReturn(true);

        boolean result = workoutController.deleteWorkout("workout123");

        assertTrue(result);
        verify(workoutService).deleteWorkout("workout123");
    }

    @Test
    void testDeleteWorkout_ThrowsException() throws Exception {
        when(workoutService.deleteWorkout("invalidWorkoutId")).thenReturn(false);

        assertFalse(workoutController.deleteWorkout("invalidWorkoutId"));
        verify(workoutService).deleteWorkout("invalidWorkoutId");
    }
}

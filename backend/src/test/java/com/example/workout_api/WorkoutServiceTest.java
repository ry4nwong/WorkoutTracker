package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.exception.WorkoutNotFoundException;
import com.example.workout_api.model.user.User;
import com.example.workout_api.model.workout.Workout;
import com.example.workout_api.payload.workout.WorkoutInput;
import com.example.workout_api.repository.UserRepository;
import com.example.workout_api.service.WorkoutService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class WorkoutServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private WorkoutService workoutService;

    private User mockUser;
    private Workout mockWorkout;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId("user123");
        mockUser.setUsername("testUser");
        mockUser.setWorkouts(new ArrayList<>());

        mockWorkout = new Workout();
        mockWorkout.setId("workout123");
        mockWorkout.setWorkoutName("Sample Workout Title");

        mockUser.getWorkouts().add(mockWorkout);
    }

    // Create workout
    @Test
    void testCreateWorkout_Success() throws Exception {
        WorkoutInput input = new WorkoutInput();
        input.setWorkoutName("New Workout");
        input.setDuration(0);
        input.setTotalVolumePounds(0.0);
        input.setExercises(new ArrayList<>());

        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        Workout created = workoutService.createWorkout("user123", input);
        assertNotNull(created);
        assertEquals("New Workout", created.getWorkoutName());

        verify(userRepository).findById("user123");
        verify(userRepository).save(mockUser);
    }

    @Test
    void testCreateWorkout_UserNotFound() {
        WorkoutInput input = new WorkoutInput();
        when(userRepository.findById("noUser")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> workoutService.createWorkout("noUser", input));
        verify(userRepository).findById("noUser");
        verify(userRepository, never()).save(any(User.class));
    }

    // Modify workout
    @Test
    void testModifyWorkout_Success() throws Exception {
        WorkoutInput input = new WorkoutInput();
        input.setWorkoutName("Modified Title");
        input.setDuration(0);
        input.setTotalVolumePounds(0.0);
        input.setExercises(new ArrayList<>());

        when(userRepository.findByWorkoutId("workout123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        Workout result = workoutService.modifyWorkout("workout123", input);
        assertNotNull(result);
        assertEquals("Modified Title", result.getWorkoutName());

        verify(userRepository).findByWorkoutId("workout123");
        verify(userRepository).save(mockUser);
    }

    @Test
    void testModifyWorkout_UserNotFound() {
        WorkoutInput input = new WorkoutInput();
        when(userRepository.findByWorkoutId("badWorkoutId")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class,
                () -> workoutService.modifyWorkout("badWorkoutId", input));
        verify(userRepository).findByWorkoutId("badWorkoutId");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testModifyWorkout_WorkoutNotFound() {
        WorkoutInput input = new WorkoutInput();
        input.setWorkoutName("Doesn't matter");

        when(userRepository.findByWorkoutId("missingWorkoutId")).thenReturn(Optional.of(mockUser));

        mockUser.getWorkouts().clear();

        assertThrows(WorkoutNotFoundException.class,
                () -> workoutService.modifyWorkout("missingWorkoutId", input));
        verify(userRepository).findByWorkoutId("missingWorkoutId");
        verify(userRepository, never()).save(any(User.class));
    }

    // Delete workout
    @Test
    void testDeleteWorkout_Success() {
        when(userRepository.findByWorkoutId("workout123")).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        boolean result = workoutService.deleteWorkout("workout123");
        assertTrue(result);

        assertTrue(mockUser.getWorkouts().isEmpty());
        verify(userRepository).findByWorkoutId("workout123");
        verify(userRepository).save(mockUser);
    }

    @Test
    void testDeleteWorkout_NoUserFound() {
        when(userRepository.findByWorkoutId("badWorkoutId")).thenReturn(Optional.empty());
        boolean result = workoutService.deleteWorkout("badWorkoutId");
        assertFalse(result);
        verify(userRepository).findByWorkoutId("badWorkoutId");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testDeleteWorkout_WorkoutNotInList() {
        when(userRepository.findByWorkoutId("nonExistentWorkout")).thenReturn(Optional.of(mockUser));

        mockUser.getWorkouts().clear();

        boolean result = workoutService.deleteWorkout("nonExistentWorkout");
        assertFalse(result);
        verify(userRepository).findByWorkoutId("nonExistentWorkout");
        verify(userRepository, never()).save(any(User.class));
    }

    // Find workout
    @Test
    void testFindWorkout_Success() throws Exception {
        when(userRepository.findByWorkoutId("workout123")).thenReturn(Optional.of(mockUser));

        Workout found = workoutService.findWorkout("workout123");
        assertNotNull(found);
        assertEquals("Sample Workout Title", found.getWorkoutName());
        verify(userRepository).findByWorkoutId("workout123");
    }

    @Test
    void testFindWorkout_NoUserFound() {
        when(userRepository.findByWorkoutId("badWorkoutId")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> workoutService.findWorkout("badWorkoutId"));
        verify(userRepository).findByWorkoutId("badWorkoutId");
    }

    @Test
    void testFindWorkout_WorkoutNotFound() {
        when(userRepository.findByWorkoutId("missingWorkoutId")).thenReturn(Optional.of(mockUser));
        mockUser.getWorkouts().clear();

        assertThrows(WorkoutNotFoundException.class, () -> workoutService.findWorkout("missingWorkoutId"));
        verify(userRepository).findByWorkoutId("missingWorkoutId");
    }

    @Test
    void testFindAllWorkouts_Success() throws Exception {
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));

        List<Workout> workouts = workoutService.findAllWorkouts("user123");
        assertEquals(1, workouts.size());
        assertEquals("workout123", workouts.get(0).getId());
        verify(userRepository).findById("user123");
    }

    @Test
    void testFindAllWorkouts_UserNotFound() {
        when(userRepository.findById("noUser")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> workoutService.findAllWorkouts("noUser"));
        verify(userRepository).findById("noUser");
    }
}

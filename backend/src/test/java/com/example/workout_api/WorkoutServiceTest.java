package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.atMostOnce;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.exception.WorkoutNotFoundException;
import com.example.workout_api.model.exercise.CardioExercise;
import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.model.exercise.WeightExercise;
import com.example.workout_api.model.user.User;
import com.example.workout_api.model.workout.Workout;
import com.example.workout_api.repository.UserRepository;
import com.example.workout_api.service.WorkoutService;

// public class WorkoutServiceTest {
//     @Mock
//     private UserRepository userRepository;

//     @InjectMocks
//     private WorkoutService workoutService;

//     private User user;
//     private Workout workout;
//     private Workout updatedWorkout;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//         user = new User();
//         user.setId("12345678");
//         user.setUsername("testuser");
//         user.setFirstName("Test");
//         user.setLastName("User");
//         user.setWorkouts(new ArrayList<>());

//         workout = new Workout("Test Workout", "", 130, 15000, new ArrayList<Exercise>());
//         workout.setId("1");

//         updatedWorkout = new Workout("Updated Workout", "", 145, 19000, new ArrayList<Exercise>());
//         updatedWorkout.setId("1");
//     }

//     @Test
//     void testCreateWorkout() throws Exception {
//         when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
//         when(userRepository.save(user)).thenReturn(user);
//         Workout newWorkout = workoutService.createWorkout("testuser", workout);
        
//         assertEquals("Test Workout", newWorkout.getWorkoutName());
//         verify(userRepository, atMostOnce()).save(any(User.class));
//         assertEquals(1, user.getWorkouts().size());
//     }

//     @Test
//     void testCreateWorkoutInvalidUsername() throws Exception {
//         when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        
//         assertThrows(UserNotFoundException.class, () -> workoutService.createWorkout("testuser", workout));
//     }

//     @Test
//     void testModifyWorkout() throws Exception {
//         user.getWorkouts().add(workout);
//         when(userRepository.findByWorkoutId("1")).thenReturn(Optional.of(user));
//         Workout modifiedWorkout = workoutService.modifyWorkout("1", updatedWorkout);
        
//         assertEquals("Updated Workout", modifiedWorkout.getWorkoutName());
//         assertEquals(145, modifiedWorkout.getDuration());
//         verify(userRepository, atMostOnce()).save(any(User.class));
//         assertEquals(1, user.getWorkouts().size());
//     }

//     @Test
//     void testModifyWorkoutInvalidWorkoutId() throws Exception {
//         when(userRepository.findByWorkoutId("1")).thenReturn(Optional.of(user));
        
//         assertThrows(WorkoutNotFoundException.class, () -> workoutService.modifyWorkout("1", updatedWorkout));
//         verify(userRepository, never()).save(any(User.class));
//         assertEquals(0, user.getWorkouts().size());
//     }

//     @Test
//     void testModifyWorkoutInvalidUsername() throws Exception {
//         when(userRepository.findByWorkoutId("1")).thenReturn(Optional.empty());
        
//         assertThrows(UserNotFoundException.class, () -> workoutService.modifyWorkout("1", updatedWorkout));
//         assertEquals(0, user.getWorkouts().size());
//     }

//     @Test
//     void testDeleteWorkout() throws Exception {
//         user.getWorkouts().add(workout);
//         when(userRepository.findByWorkoutId("1")).thenReturn(Optional.of(user));

//         assertEquals(true, workoutService.deleteWorkout("1"));
//         verify(userRepository, atMostOnce()).save(any(User.class));
//         assertEquals(0, user.getWorkouts().size());
//     }

//     @Test
//     void testDeleteWorkoutFailed() throws Exception {
//         user.getWorkouts().add(workout);
//         when(userRepository.findByWorkoutId("1")).thenReturn(Optional.empty());

//         assertEquals(false, workoutService.deleteWorkout("1"));
//         verify(userRepository, never()).save(any(User.class));
//         assertEquals(1, user.getWorkouts().size());
//     }

//     @Test
//     void testFindWorkout() throws Exception {
//         user.getWorkouts().add(workout);
//         when(userRepository.findByWorkoutId("1")).thenReturn(Optional.of(user));
//         Workout foundWorkout = workoutService.findWorkout("1");

//         assertEquals("1", foundWorkout.getId());
//         assertEquals("Test Workout", foundWorkout.getWorkoutName());
//     }

//     @Test
//     void testFindWorkoutInvalidWorkoutId() throws Exception {
//         when(userRepository.findByWorkoutId("1")).thenReturn(Optional.of(user));

//         assertThrows(WorkoutNotFoundException.class, () -> workoutService.findWorkout("1"));
//     }

//     @Test
//     void testFindWorkoutInvalidUsername() throws Exception {
//         when(userRepository.findByWorkoutId("1")).thenReturn(Optional.empty());

//         assertThrows(UserNotFoundException.class, () -> workoutService.findWorkout("1"));
//     }

//     @Test
//     void testFindAllWorkouts() throws Exception {
//         user.getWorkouts().add(workout);
//         when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
//         List<Workout> workoutList = workoutService.findAllWorkouts("testuser");

//         assertEquals(1, workoutList.size());
//     }

//     @Test
//     void testFindAllWorkoutsInvalidUsername() throws Exception {
//         when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

//         assertThrows(UserNotFoundException.class, () -> workoutService.findAllWorkouts("testuser"));
//     }
// }

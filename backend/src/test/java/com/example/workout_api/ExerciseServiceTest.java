package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import com.example.workout_api.model.exercise.CardioExercise;
import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.model.exercise.WeightExercise;
import com.example.workout_api.payload.exercise.ExerciseType;
import com.example.workout_api.repository.ExerciseRepository;
import com.example.workout_api.service.ExerciseService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ExerciseServiceTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private ExerciseService exerciseService;

    private List<Exercise> mockExercises;
    private Exercise mockExercise;

    @BeforeEach
    void setUp() {
        mockExercises = new ArrayList<>();

        WeightExercise weightExercise = new WeightExercise("ex1", ExerciseType.WEIGHT, "", "", "", new ArrayList<>());

        CardioExercise cardioExercise = new CardioExercise("ex2", ExerciseType.CARDIO, "", "", new ArrayList<>());

        mockExercises.add(weightExercise);
        mockExercises.add(cardioExercise);

        mockExercise = weightExercise;
    }

    // Get all exercises
    @Test
    void testGetAll_Success() {
        when(exerciseRepository.findAll()).thenReturn(mockExercises);

        List<Exercise> result = exerciseService.getAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(exerciseRepository).findAll();
    }

    @Test
    void testGetAll_ThrowsException() {
        when(exerciseRepository.findAll()).thenThrow(new RuntimeException("DB Error"));

        assertThrows(RuntimeException.class, () -> exerciseService.getAll());
        verify(exerciseRepository).findAll();
    }

    // Add exercise
    @Test
    void testAddExercise_Success() {
        when(exerciseRepository.save(mockExercise)).thenReturn(mockExercise);

        Exercise result = exerciseService.addExercise(mockExercise);

        assertNotNull(result);
        assertEquals("ex1", result.getId());
        verify(exerciseRepository).save(mockExercise);
    }

    @Test
    void testAddExercise_ThrowsException() {
        when(exerciseRepository.save(mockExercise)).thenThrow(new RuntimeException("Save Error"));

        assertThrows(RuntimeException.class, () -> exerciseService.addExercise(mockExercise));
        verify(exerciseRepository).save(mockExercise);
    }
}


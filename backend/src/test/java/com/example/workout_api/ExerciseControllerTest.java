package com.example.workout_api;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import com.example.workout_api.controller.ExerciseController;
import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.payload.exercise.ExerciseType;
import com.example.workout_api.service.ExerciseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ExerciseControllerTest {

    @Mock
    private ExerciseService exerciseService;

    @InjectMocks
    private ExerciseController exerciseController;

    private List<Exercise> mockExercises;

    @BeforeEach
    void setUp() {
        Exercise e1 = new Exercise("ex1", ExerciseType.BODYWEIGHT, "Exercise", "");
        
        Exercise e2 = new Exercise("ex1", ExerciseType.BODYWEIGHT, "Exercise", "");

        mockExercises = new ArrayList<>();
        mockExercises.add(e1);
        mockExercises.add(e2);
    }

    @Test
    void testAllExercises_Success() {
        when(exerciseService.getAll()).thenReturn(mockExercises);

        List<Exercise> result = exerciseController.allExercises();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(exerciseService).getAll();
    }

    @Test
    void testAllExercises_ThrowsException() {
        when(exerciseService.getAll()).thenThrow(new RuntimeException("Database error"));

        assertThrows(RuntimeException.class, () -> exerciseController.allExercises());
        verify(exerciseService).getAll();
    }
}


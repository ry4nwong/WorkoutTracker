package com.example.workout_api.model.workout;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Workout {
    @Id
    private String id;
    private String workoutName;
    private String date;
    private long duration;
    private int totalVolume;
    private List<Exercise> exercises;
}

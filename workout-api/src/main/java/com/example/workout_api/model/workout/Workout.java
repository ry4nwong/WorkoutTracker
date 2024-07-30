package com.example.workout_api.model.workout;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Workout {
    @Id
    private String id;
    private String workoutName;
    private Date date;
    private long duration;
    private int totalVolume;
    private List<WeightExercise> weightExercises;
    private List<CardioExercise> cardioExercises;

    public Workout(String workoutName, long duration, int totalVolume,
            List<WeightExercise> weightExercises, List<CardioExercise> cardioExercises) {
        this.id = UUID.randomUUID().toString();
        this.workoutName = workoutName;
        this.date = new Date();
        this.duration = duration;
        this.totalVolume = totalVolume;
        this.weightExercises = weightExercises;
        this.cardioExercises = cardioExercises;
    }
}

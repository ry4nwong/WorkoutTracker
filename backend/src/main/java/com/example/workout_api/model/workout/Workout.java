package com.example.workout_api.model.workout;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;

import com.example.workout_api.model.exercise.Exercise;

import lombok.Data;

@Data
public class Workout implements Comparable<Workout> {
    @Id
    private String id;
    private String workoutName;
    private String description;
    private Date date;
    private long duration;
    private double totalVolumePounds;
    private List<Exercise> exercises;

    public Workout(String workoutName, String description, long duration, double totalVolumePounds,
            List<Exercise> exercises) {
        this.id = UUID.randomUUID().toString();
        this.workoutName = workoutName;
        this.description = description;
        this.date = new Date();
        this.duration = duration;
        this.totalVolumePounds = totalVolumePounds;
        this.exercises = exercises;
    }

    @Override
    public int compareTo(Workout otherWorkout) {
        return Double.compare(totalVolumePounds, otherWorkout.getTotalVolumePounds());
    }
}

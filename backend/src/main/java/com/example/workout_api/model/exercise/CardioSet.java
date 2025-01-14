package com.example.workout_api.model.exercise;

import lombok.Data;

@Data
public class CardioSet extends Set{
    private String duration;
    private double distance;

    public CardioSet(int id, String duration, double distance) {
        super(id);
        this.duration = duration;
        this.distance = distance;
    }
}

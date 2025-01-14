package com.example.workout_api.model.exercise;

import lombok.Data;

@Data
public class WeightSet extends Set {
    private Double weight;
    private Integer reps;

    public WeightSet(Integer id, Double weight, Integer reps) {
        super(id);
        this.weight = weight;
        this.reps = reps;
    }
}

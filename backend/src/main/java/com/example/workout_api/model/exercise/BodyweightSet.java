package com.example.workout_api.model.exercise;

import lombok.Data;

@Data
public class BodyweightSet extends Set {
    private Integer reps;

    public BodyweightSet(int id, Integer reps) {
        super(id);
        this.reps = reps;
    }
}

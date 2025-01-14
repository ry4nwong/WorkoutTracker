package com.example.workout_api.payload.set;

import lombok.Data;

@Data
public class WeightSetInput {
    private Integer id;
    private Integer reps;
    private Double weight;
}

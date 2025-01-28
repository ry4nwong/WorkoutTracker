package com.example.workout_api.payload.set;

import lombok.Data;

@Data
public class CardioSetInput {
    private Integer id;
    private String duration;
    private Double distance;
}

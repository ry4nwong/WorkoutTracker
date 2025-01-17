package com.example.workout_api.payload.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UnitsInput {
    private boolean isUsingMiles;
    private boolean isUsingPounds;
    private boolean isUsingInches;
}

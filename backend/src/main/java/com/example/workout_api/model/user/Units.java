package com.example.workout_api.model.user;

import com.example.workout_api.payload.user.UnitsInput;

import lombok.Data;

@Data
public class Units {
    private boolean isUsingMiles;
    private boolean isUsingPounds;
    private boolean isUsingInches;

    public Units() {
        isUsingMiles = true;
        isUsingPounds = true;
        isUsingInches = true;
    }

    public Units(UnitsInput unitsInput) {
        isUsingMiles = unitsInput.isUsingMiles();
        isUsingPounds = unitsInput.isUsingPounds();
        isUsingInches = unitsInput.isUsingInches();
    }
}

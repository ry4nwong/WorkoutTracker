package com.example.workout_api.model.user;

import lombok.Data;

@Data
public class UserPreferences {
    private boolean isUsingMiles;
    private boolean isUsingPounds;
    private boolean isUsingInches;
    private boolean isPrivateAccount;

    public UserPreferences() {
        isUsingMiles = true;
        isUsingPounds = true;
        isUsingInches = true;
        isPrivateAccount = false;
    }
}

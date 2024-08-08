package com.example.workout_api.model.user;

import lombok.Data;

@Data
public class UserPreferences {
    private boolean isUsingMiles;
    private boolean isUsingPounds;
    private boolean isPrivateAccount;

    public UserPreferences() {
        isUsingMiles = true;
        isUsingPounds = true;
        isPrivateAccount = false;
    }
}

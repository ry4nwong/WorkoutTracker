package com.example.workout_api.model.user;

import com.example.workout_api.payload.user.PreferencesInput;

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

    public UserPreferences(PreferencesInput newPreferences) {
        isUsingMiles = newPreferences.isUsingMiles();
        isUsingPounds = newPreferences.isUsingPounds();
        isUsingInches = newPreferences.isUsingInches();
        isPrivateAccount = newPreferences.isPrivateAccount();
    }
}

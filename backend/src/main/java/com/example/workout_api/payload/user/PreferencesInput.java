package com.example.workout_api.payload.user;

import lombok.Data;

@Data
public class PreferencesInput {
    private boolean isUsingMiles;
    private boolean isUsingPounds;
    private boolean isUsingInches;
    private boolean isPrivateAccount;
}

package com.example.workout_api.model.exercise;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "setType"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = WeightSet.class, name = "weight"),
    @JsonSubTypes.Type(value = CardioSet.class, name = "cardio"),
    @JsonSubTypes.Type(value = BodyweightSet.class, name = "bodyweight")
})
public class Set {
    private int id;
}

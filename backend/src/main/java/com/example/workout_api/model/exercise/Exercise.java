package com.example.workout_api.model.exercise;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.Data;

@Data
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "exerciseType"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = WeightExercise.class, name = "weight"),
    @JsonSubTypes.Type(value = CardioExercise.class, name = "cardio"),
    @JsonSubTypes.Type(value = BodyweightExercise.class, name = "bodyweight")
})
@Document(collection = "exercises")
public class Exercise {
    private String exerciseName;
    private String description;
}
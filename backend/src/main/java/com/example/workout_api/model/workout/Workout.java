package com.example.workout_api.model.workout;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;

import com.example.workout_api.model.exercise.BodyweightExercise;
import com.example.workout_api.model.exercise.BodyweightSet;
import com.example.workout_api.model.exercise.CardioExercise;
import com.example.workout_api.model.exercise.CardioSet;
import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.model.exercise.WeightExercise;
import com.example.workout_api.model.exercise.WeightSet;
import com.example.workout_api.payload.exercise.BodyweightExerciseInput;
import com.example.workout_api.payload.exercise.CardioExerciseInput;
import com.example.workout_api.payload.exercise.ExerciseInput;
import com.example.workout_api.payload.exercise.WeightExerciseInput;
import com.example.workout_api.payload.workout.WorkoutInput;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Workout implements Comparable<Workout> {
    @Id
    private String id;
    private String workoutName;
    private String description;
    private String date;
    private int duration;
    private double totalVolumePounds;
    private List<Exercise> exercises;

    public Workout(String workoutName, String description, String date, int duration, double totalVolumePounds,
            List<Exercise> exercises) {
        this.id = UUID.randomUUID().toString();
        this.workoutName = workoutName;
        this.description = description;
        this.date = date;
        this.duration = duration;
        this.totalVolumePounds = totalVolumePounds;
        this.exercises = exercises;
    }

    public Workout(WorkoutInput workoutInput) {
        this.id = UUID.randomUUID().toString();
        this.workoutName = workoutInput.getWorkoutName();
        this.description = workoutInput.getDescription();
        this.date = workoutInput.getDate();
        this.duration = workoutInput.getDuration();
        this.totalVolumePounds = workoutInput.getTotalVolumePounds();
        this.exercises = convertToExercises(workoutInput.getExercises());
    }

    public List<Exercise> convertToExercises(List<ExerciseInput> exerciseInputs) {
        return exerciseInputs.stream()
                .map(input -> {
                    switch (input.getExerciseType()) {
                        case WEIGHT:
                            WeightExerciseInput weightInput = input.getWeightExercise();
                            return new WeightExercise(
                                    weightInput.getId(),
                                    weightInput.getExerciseName(),
                                    weightInput.getDescription(),
                                    weightInput.getMuscleTargeted(),
                                    weightInput.getSets().stream()
                                            .map(set -> new WeightSet(set.getId(), set.getWeight(), set.getReps()))
                                            .collect(Collectors.toList())
                            );
                        case CARDIO:
                            CardioExerciseInput cardioInput = input.getCardioExercise();
                            return new CardioExercise(
                                    cardioInput.getId(),
                                    cardioInput.getExerciseName(),
                                    cardioInput.getDescription(),
                                    cardioInput.getSets().stream()
                                            .map(set -> new CardioSet(set.getId(), set.getDuration(), set.getDistance()))
                                            .collect(Collectors.toList())
                            );
                        case BODYWEIGHT:
                            BodyweightExerciseInput bodyweightInput = input.getBodyweightExercise();
                            return new BodyweightExercise(
                                    bodyweightInput.getId(),
                                    bodyweightInput.getExerciseName(),
                                    bodyweightInput.getDescription(),
                                    bodyweightInput.getMuscleTargeted(),
                                    bodyweightInput.getSets().stream()
                                            .map(set -> new BodyweightSet(set.getId(), set.getReps()))
                                            .collect(Collectors.toList())
                            );
                        default:
                            throw new IllegalArgumentException("Unknown exercise type: " + input.getExerciseType());
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public int compareTo(Workout otherWorkout) {
        return Double.compare(totalVolumePounds, otherWorkout.getTotalVolumePounds());
    }
}

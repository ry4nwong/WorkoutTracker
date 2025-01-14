package com.example.workout_api.config;

import graphql.scalars.ExtendedScalars;
import graphql.schema.TypeResolver;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

import com.example.workout_api.model.exercise.BodyweightExercise;
import com.example.workout_api.model.exercise.BodyweightSet;
import com.example.workout_api.model.exercise.CardioExercise;
import com.example.workout_api.model.exercise.CardioSet;
import com.example.workout_api.model.exercise.Exercise;
import com.example.workout_api.model.exercise.Set;
import com.example.workout_api.model.exercise.WeightExercise;
import com.example.workout_api.model.exercise.WeightSet;

@Configuration
public class GraphQLConfig {

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return wiringBuilder -> wiringBuilder
                .scalar(ExtendedScalars.DateTime)
                .type("Exercise", typeWiring -> typeWiring.typeResolver(exerciseTypeResolver()))
                .type("Set", typeWiring -> typeWiring.typeResolver(setTypeResolver()));
    }

    private TypeResolver exerciseTypeResolver() {
        return env -> {
            Exercise exercise = env.getObject();
            if (exercise instanceof WeightExercise) {
                return env.getSchema().getObjectType("WeightExercise");
            } else if (exercise instanceof CardioExercise) {
                return env.getSchema().getObjectType("CardioExercise");
            } else if (exercise instanceof BodyweightExercise) {
                return env.getSchema().getObjectType("BodyweightExercise");
            } else {
                return null;
            }
        };
    }

    private TypeResolver setTypeResolver() {
        return env -> {
            Set set = env.getObject();
            if (set instanceof WeightSet) {
                return env.getSchema().getObjectType("WeightSet");
            } else if (set instanceof CardioSet) {
                return env.getSchema().getObjectType("CardioSet");
            } else if (set instanceof BodyweightSet) {
                return env.getSchema().getObjectType("BodyweightSet");
            } else {
                return null;
            }
        };
    }
}

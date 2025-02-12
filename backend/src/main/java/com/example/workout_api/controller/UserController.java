package com.example.workout_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.workout_api.model.user.User;
import com.example.workout_api.payload.user.BodyDataInput;
import com.example.workout_api.payload.user.LoginInput;
import com.example.workout_api.payload.user.UnitsInput;
import com.example.workout_api.payload.user.ProfileInput;
import com.example.workout_api.payload.user.UserInput;
import com.example.workout_api.service.UserService;

@Controller
public class UserController {

    @Autowired
    public UserService userService;

    @MutationMapping
    public User register(@Argument UserInput userInput) throws Exception {
        return userService.createUser(userInput);
    }

    @MutationMapping
    public User login(@Argument LoginInput loginInput) throws Exception {
        return userService.verifyCredentials(loginInput);
    }

    @MutationMapping
    public User updateProfileInfo(@Argument String id, @Argument ProfileInput profileInput) throws Exception {
        return userService.updateProfile(id, profileInput);
    }

    @MutationMapping
    public User updateUnits(@Argument String id, @Argument UnitsInput unitsInput) throws Exception {
        return userService.updateUnits(id, unitsInput);
    }

    @MutationMapping
    public User updateBodyData(@Argument String id, @Argument BodyDataInput bodyDataInput) throws Exception {
        return userService.updateBodyData(id, bodyDataInput);
    }

    @MutationMapping
    public boolean delete(@Argument String id) {
        return userService.deleteUser(id);
    }

    @QueryMapping
    public List<User> allUsers() {
        return userService.getAll();
    }

    @QueryMapping
    public User user(@Argument String id) throws Exception {
        return userService.findUserById(id);
    }

    @QueryMapping
    public User userByUsername(@Argument String username) throws Exception {
        return userService.findUserByUsername(username);
    }

    @QueryMapping
    public boolean usernameExists(@Argument String username) {
        return userService.usernameExists(username);
    }

    @QueryMapping
    public boolean emailExists(@Argument String email) {
        return userService.emailExists(email);
    }

    @MutationMapping
    public User updateEmail(@Argument String id, @Argument String email) throws Exception {
        return userService.updateEmail(id, email);
    }

    @MutationMapping
    public User updatePassword(@Argument String id, @Argument String password) throws Exception {
        return userService.updatePassword(id, password);
    }

    @MutationMapping
    public User updateDarkMode(@Argument String id, @Argument Boolean darkMode) throws Exception {
        return userService.updateDarkMode(id, darkMode);
    }

    @MutationMapping
    public User updatePrivateAccount(@Argument String id, @Argument Boolean privateAccount) throws Exception {
        return userService.updatePrivateAccount(id, privateAccount);
    }
}

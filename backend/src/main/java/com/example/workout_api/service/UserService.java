package com.example.workout_api.service;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.workout_api.exception.EmailAlreadyExistsException;
import com.example.workout_api.exception.InvalidCredentialsException;
import com.example.workout_api.exception.UserNotFoundException;
import com.example.workout_api.exception.UsernameAlreadyExistsException;
import com.example.workout_api.model.user.BodyData;
import com.example.workout_api.model.user.User;
import com.example.workout_api.model.user.Units;
import com.example.workout_api.payload.user.BodyDataInput;
import com.example.workout_api.payload.user.LoginInput;
import com.example.workout_api.payload.user.UnitsInput;
import com.example.workout_api.payload.user.ProfileInput;
import com.example.workout_api.payload.user.UserInput;
import com.example.workout_api.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(UserInput newUser) throws Exception {
        if(userRepository.existsByUsername(newUser.getUsername())) {
            throw new UsernameAlreadyExistsException();
        } else if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
        
        newUser.setPassword(BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt()));
        return userRepository.save(new User(newUser));
    }

    public User verifyCredentials(LoginInput loginInput) throws Exception {
        Optional<User> foundUser = userRepository.findByUsername(loginInput.getUsername());
        if(foundUser.isPresent() && BCrypt.checkpw(loginInput.getPassword(), foundUser.get().getPassword())) {
            return foundUser.get();
        } else {
            throw new InvalidCredentialsException();
        }
    }

    public boolean usernameExists(String username) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        return existingUser.isPresent();
    }

    public boolean emailExists(String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        return existingUser.isPresent();
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User findUserByUsername(String username) throws Exception {
        User foundUser = userRepository.findByUsername(username).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        return foundUser;
    }

    public User findUserById(String id) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        return foundUser;
    }

    public User updateUnits(String id, UnitsInput unitsInput) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        Units newUnits = new Units(unitsInput);
        foundUser.setUnits(newUnits);
        return userRepository.save(foundUser);
    }

    public User updateProfile(String id, ProfileInput updatedProfile) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        foundUser.setFirstName(updatedProfile.getFirstName());
        foundUser.setLastName(updatedProfile.getLastName());
        foundUser.setUsername(updatedProfile.getUsername());
        foundUser.setEmail(updatedProfile.getEmail());
        foundUser.setBiography(updatedProfile.getBiography());
        return userRepository.save(foundUser);
    }

    public User updateBodyData(String id, BodyDataInput bodyDataInput) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        BodyData newBodyData = new BodyData();
        newBodyData.setHeight(bodyDataInput.getHeight());
        newBodyData.setWeight(bodyDataInput.getWeight());
        foundUser.setBodyData(newBodyData);
        return userRepository.save(foundUser);
    }

    public boolean deleteUser(String id) {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            return false;
        }
        userRepository.delete(foundUser);
        return true;
    }

    public User updateEmail(String id, String email) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        foundUser.setEmail(email);
        return userRepository.save(foundUser);
    }

    public User updatePassword(String id, String password) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        foundUser.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
        return userRepository.save(foundUser);
    }

    public User updateDarkMode(String id, Boolean darkMode) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        foundUser.setDarkMode(darkMode);
        return userRepository.save(foundUser);
    }

    public User updatePrivateAccount(String id, Boolean privateAccount) throws Exception {
        User foundUser = userRepository.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException();
        }
        foundUser.setIsPrivateAccount(privateAccount);
        return userRepository.save(foundUser);
    }
}

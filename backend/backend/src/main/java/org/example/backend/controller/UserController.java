package org.example.backend.controller;

import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://127.0.0.1:5500")  // Allow frontend access
public class UserController {
    @Autowired
    private UserService userService;

    // Get all users (For testing)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // User Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            User newUser = userService.createUser(user);
            return ResponseEntity.ok(newUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> loggedInUser = userService.authenticateUser(user.getEmail(), user.getPassword());

        return loggedInUser
                .<ResponseEntity<?>>map(ResponseEntity::ok)  // Ensure consistent return type
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
    }
    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Optional<User> loggedInUser = userService.authenticateUser(email, password);

        return loggedInUser
                .<ResponseEntity<?>>map(ResponseEntity::ok)  // Ensure consistent return type
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
    }


}

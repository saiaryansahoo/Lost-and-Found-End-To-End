package org.example.backend.controller;

import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.example.backend.config.jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://127.0.0.1:5500")  // Allow frontend access
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private jwt jwtUtil;  // JWT Utility for token generation


    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = (List<User>) userService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    // ✅ User Signup (Returns JWT Token)
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            if (user == null || user.getUsername() == null || user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Username, Email, and Password are required");
            }

            // ✅ Create user
            User newUser = userService.createUser(user);

            // ✅ Generate JWT token upon signup
            String token = jwtUtil.generateToken(newUser.getEmail());

            // ✅ Return user details + token
            HashMap<String, Object> response = new HashMap<>();
            response.put("user", newUser);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ User Login (Returns JWT Token)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        if (user == null || user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and Password are required");
        }

        Optional<User> loggedInUser = userService.authenticateUser(user.getEmail(), user.getPassword());

        if (loggedInUser.isPresent()) {
            // ✅ Generate JWT token upon login
            String token = jwtUtil.generateToken(loggedInUser.get().getEmail());

            // ✅ Return user details + token
            HashMap<String, Object> response = new HashMap<>();
            response.put("user", loggedInUser.get());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}

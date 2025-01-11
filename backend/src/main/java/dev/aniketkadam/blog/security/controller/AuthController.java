package dev.aniketkadam.blog.security.controller;

import dev.aniketkadam.blog.playload.JwtResponse;
import dev.aniketkadam.blog.security.service.JwtService;
import dev.aniketkadam.blog.user.User;
import dev.aniketkadam.blog.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtResponse> registerUser(@Valid @RequestBody User user) throws Exception {
        User registerUser = userService.registerUser(user);
        // generate token after account is created
        String token = doAuthenticate(user.getUsername(), user.getPassword());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(JwtResponse
                        .builder()
                        .token(token)
                        .user(registerUser)
                        .timestamp(LocalDate.now())
                        .build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestParam String username,
            @RequestParam String password
    ) throws Exception {
        String token = doAuthenticate(username, password);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(JwtResponse
                        .builder()
                        .token(token)
                        .user(userService.findUserByProfile(token))
                        .timestamp(LocalDate.now())
                        .build());
    }

    private String doAuthenticate(String username, String password) throws Exception {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication =
                authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(username);
            return token;
        }
        throw new BadCredentialsException("Username or password are wrong");
    }

}

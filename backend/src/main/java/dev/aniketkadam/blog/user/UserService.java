package dev.aniketkadam.blog.user;

import dev.aniketkadam.blog.security.service.JwtService;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User registerUser(User user) throws Exception {
        // check the email is unique
        if (!user.getEmail().isEmpty() && userRepository.existsByEmail(user.getEmail()))
            throw new Exception("Email is already exist!");
        // check the username is unique
        if (!user.getUsername().isEmpty() && userRepository.existsByUsername(user.getUsername())) //userRepository.existsByUsername(user.getUsername())
            throw new Exception("Username is already exist!");

        User registerUser = User.builder()
                .fullName(user.getFullName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(Role.USER)
                .password(passwordEncoder.encode(user.getPassword()))
                .build();
        return userRepository.save(registerUser);
    }

    public User findUserById(Integer id) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent())
            return user.get();
        throw new Exception("User not exist with id: " + id);
    }

    public User findUserByUsername(String username) throws Exception {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new Exception("User not exist with username: " + username)
        );
    }

    public User findUserByProfile(String token) throws Exception {
        token = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = jwtService.extractUsernameFromToken(token);
        return (username != null) ? findUserByUsername(username) : null;
    }
}

//TODO: create custom Exception

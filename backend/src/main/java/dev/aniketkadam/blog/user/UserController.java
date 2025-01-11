package dev.aniketkadam.blog.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/test")
    public String secured() {
        return "I'm secured";
    }

    @GetMapping("profile/{user-id}")
    public ResponseEntity<User> getUserById(@PathVariable("user-id") Integer userId) throws Exception {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.findUserById(userId));
    }
}

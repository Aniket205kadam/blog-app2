package dev.aniketkadam.blog.security.service;

import dev.aniketkadam.blog.user.User;
import dev.aniketkadam.blog.user.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final ApplicationContext context;

    public UserDetailsServiceImpl(ApplicationContext context) {
        this.context = context;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final UserService userService = context.getBean(UserService.class);
        User user = null;
        try {
            user = userService.findUserByUsername(username);
        } catch (Exception e) {
            throw new UsernameNotFoundException("User is not found"); //TODO create custom exception
        }
        return user;
    }
}

package dev.aniketkadam.blog.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // return true if the email exists
    boolean existsByEmail(String email);

    // return true if the username exists
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);
}

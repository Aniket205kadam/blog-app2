package dev.aniketkadam.blog.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query("Select p From Post p where p.userId != :userId")
    List<Post> findOtherUsersPost(@Param("userId") Integer userId);

    @Query("Select p From Post p where p.userId = :userId")
    List<Post> findMyPosts(@Param("userId") Integer userId);
}

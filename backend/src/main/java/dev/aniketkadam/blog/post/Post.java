package dev.aniketkadam.blog.post;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty(message = "title for the post is mandatory")
    private String title;

    @Column(length = (255 * 255))
    private String content;
    private String image;
    private String previewImage;

    private Integer userId;
}

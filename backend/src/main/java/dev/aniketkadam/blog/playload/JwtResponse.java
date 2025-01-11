package dev.aniketkadam.blog.playload;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.aniketkadam.blog.user.User;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class JwtResponse {
    private String token;
    private User user;
    private LocalDate timestamp;
}

package dev.aniketkadam.blog.post;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // create post
    public Post uploadPost(Post post) {
        return postRepository.save(post);
    }

    // get all post
    public List<Post> findAllPosts(Integer userId) {
        return postRepository.findOtherUsersPost(userId);
    }

    // get post by id
    public Post findPostById(Integer id) throws Exception {
        if (!postRepository.existsById(id)) {
            throw new Exception("Post is not found by id: " + id);
        }
        return postRepository.findById(id).get();
    }

    public List<Post> findMyPosts(Integer userId) {
        return  postRepository.findMyPosts(userId);
    }

    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    public boolean deletePostById(Integer postId) {
        postRepository.deleteById(postId);
        return true;
    }
}

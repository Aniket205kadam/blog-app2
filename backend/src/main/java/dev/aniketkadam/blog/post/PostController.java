package dev.aniketkadam.blog.post;

import dev.aniketkadam.blog.user.User;
import dev.aniketkadam.blog.user.UserService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
    private final PostService postService;
    private final UserService userService;

    private final String postLocation = "post";

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handlePreflightRequest() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "http://localhost:5173"); // Front-end URL
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        headers.add("Access-Control-Allow-Headers", "Authorization, Content-Type");
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    @PostConstruct
    public void init() {
        File file = new File(postLocation);

        if (!file.exists()) {
            boolean status = file.mkdir();
            //log.info(status ? file + " is created!" : file + " is not created!");
            System.out.println("file status: " + status);
        } else {
            //log.info("{} is already created!", file);
            System.out.println(file + " is already created!");
        }
    }

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Post> uploadPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestHeader("Authorization") String token,
            @RequestParam("post-image") MultipartFile postImage
    ) throws Exception {
        User currUser = userService.findUserByProfile(token);
        // upload file
        String fileUrl = uploadFile(postImage);

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUserId(currUser.getId());
        post.setImage(fileUrl);
        post.setPreviewImage(fileUrl);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(postService.uploadPost(post));
    }

    private String uploadFile(MultipartFile postImage) throws Exception {
        if (!postImage.getContentType().startsWith("image/")) {
            throw new Exception("Only allowed to upload the files!");
        }
        InputStream inputStream = postImage.getInputStream();
        String filename = String.valueOf(UUID.randomUUID());
        String fileExtension = "." + getFileExtension(postImage.getOriginalFilename(), postImage.getOriginalFilename().length());
        filename += fileExtension;

        Path path = Paths.get(postLocation, filename);
        Files.createFile(path);
        Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);

        // file location
        return postLocation + "\\" + filename;
    }

    private String getFileExtension(String originalFilename, int length) {
        // find the last index of dot character
        int lastIndexOfDot = originalFilename.lastIndexOf(".");

        if (lastIndexOfDot > 0 && lastIndexOfDot < (length - 1)) {
            return originalFilename.substring(lastIndexOfDot + 1);
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPost(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User currUser = userService.findUserByProfile(token);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(postService.findAllPosts(currUser.getId()));
    }

    @GetMapping("/{post-id}")
    public ResponseEntity<Post> getPost(
            @PathVariable("post-id") Integer postId
    ) throws Exception {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(postService.findPostById(postId));
    }

    @GetMapping("/image/{post-id}")
    public ResponseEntity<Resource> getFilename(
            @PathVariable("post-id") Integer postId,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        Post post = postService.findPostById(postId);
        Path imagePath = Paths.get(post.getImage());
        Resource resource = new UrlResource(imagePath.toUri());

        String mimeType = Files.probeContentType(imagePath);
        if (mimeType == null) {
            mimeType = "application/octet-stream";
        }

        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.parseMediaType(mimeType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imagePath.toString().substring(imagePath.toString().lastIndexOf('\\')) + "\"")
                    .body(resource);
        }
        throw new RuntimeException("Could not read the File!");
    }

    @GetMapping("/my-post")
    public ResponseEntity<List<Post>> getMyPost(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByProfile(token);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(postService.findMyPosts(user.getId()));
    }

    @PutMapping("/{post-id}")
    public ResponseEntity<Post> updatePost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("isImageChanged") boolean isImageChanged,
            @RequestHeader("Authorization") String token,
            @PathVariable("post-id") Integer postId,
            @RequestParam(value = "post-image", required = false) MultipartFile postImage
    ) throws Exception {
        Post oldPost = postService.findPostById(postId);
        User currUser = userService.findUserByProfile(token);
        if (!currUser.getId().equals(oldPost.getUserId())) {
            throw new RuntimeException("You don't have the permission to update this post!");
        }
        if (isImageChanged) {
            String newFileUrl = uploadFile(postImage);
            if (!newFileUrl.isEmpty()) {
                // remove old image
                Files.deleteIfExists(Paths.get(oldPost.getImage()));
            }
            Post post = Post
                    .builder()
                    .title(title)
                    .id(oldPost.getId())
                    .userId(oldPost.getUserId())
                    .content(content)
                    .image(newFileUrl)
                    .build();
            return ResponseEntity
                    .status(HttpStatus.ACCEPTED)
                    .body(postService.updatePost(post));
        }
        Post post = Post
                .builder()
                .title(title)
                .userId(oldPost.getUserId())
                .image(oldPost.getImage())
                .previewImage(oldPost.getPreviewImage())
                .content(content)
                .id(oldPost.getId())
                .build();
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(postService.updatePost(post));
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity<?> deletePost(
            @PathVariable("post-id") Integer postId,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        Post post = postService.findPostById(postId);
        User currUser = userService.findUserByProfile(token);
        if (!currUser.getId().equals(post.getUserId())) {
            throw new RuntimeException("You don't have the permission to delete this post!");
        }
        if (postService.deletePostById(postId))
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Post Delete Successfully!");
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Post is not Deleted!");
    }

}

import postService from "./PostService.js";
import userService from "./UserService.js";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50U3RhdHVzIjoiQUNUSVZFIiwicm9sZSI6IlVTRVIiLCJlbWFpbCI6InNoYW52aUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InNoYW52aSIsInN1YiI6IjMiLCJpYXQiOjE3MzY1MDk1MDMsImV4cCI6MTczNjYxNzUwM30.gllu1BzhAk7bDfz5Gu6zqJqByk8zJHf-6Wu6FTjDVy4';

async function getPostById() {
    const response = await postService.getPostById(1, token);
    console.log(response);
}

async function getAllPost() {
    const response = await postService.getAllPost(token);
    console.log(response);
}

async function getMyPost() {
    const response = await postService.getMyPost(token);
    console.log(response);
}

async function getUserById() {
    const response = await userService.getUserById(1, token);
    console.log(response);
}

// getPostById();
// getAllPost();
// getMyPost();
getUserById();
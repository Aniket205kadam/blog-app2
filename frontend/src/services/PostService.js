import AppConfig from "../config/AppConfig";

export class PostService {

    // upload a post 
    async uploadPost(post, file, token) {
        const apiUrl = `${AppConfig.blogAppAPI}/api/v1/posts`;

        // create FormData
        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("content", post.content);
        formData.append("post-image", file);
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const result = response.json();
            return result;
        } catch (error) {
            console.error("Error uploading post: ", error);
            throw error;
        }
    }

    // get all post
    async getAllPost(token) {
        if (!token) {
            throw new Error(`The token is empty`);
        }
        const apiUrl = `${AppConfig.blogAppAPI}/api/v1/posts`;
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.text}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error to get the post: ", error.message);
            throw error;
        }
    }

    // get post by id
    async getPostById(postId, token) {
        if (!postId || !token) {
            throw new Error(`The postId or token is empty`);
        }

        const apiUrl = `${AppConfig.blogAppAPI}/api/v1/posts/${postId}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error to get the post by id: ", error.message);
            throw error;
        }
    }

    // edit post 
    async editPost(post, postId, isImageChanged, file, token) {
        const apiUrl=`${AppConfig.blogAppAPI}/api/v1/posts/${postId}`;

        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("content", post.content);
        formData.append("isImageChanged", isImageChanged);

        if (isImageChanged) {
            formData.append("post-image", file);
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error("Error in edit the post: ", error.message);
            throw error;
        }
    }

    // delete post by id
    async deletePost(postId, token) {
        const apiUrl = `${AppConfig.blogAppAPI}/api/v1/posts/${postId}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return true;
        } catch (error) {
            console.error("Error in delete post: ", error.message);
            throw error;
        }
    }

    // get post image
    async getPostImage(postId, token) {
        const apiUrl = `${AppConfig.blogAppAPI}/api/v1/posts/image/${postId}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.blob();
        } catch (error) {
            console.error("Error in get Post image: ", error.message);
            throw error;
        }
    }

    // get my post
    async getMyPost(token) {
        const apiUrl = `${AppConfig.blogAppAPI}/api/v1/posts/my-post`;
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error("Error to get my post");
            throw error;
        }
    }

}

export default new PostService();
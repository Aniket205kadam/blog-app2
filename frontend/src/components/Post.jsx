import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import postService from '../services/PostService';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import parser from 'html-react-parser';
import '../App.css';
import { deleteMyPost } from '../store/postSlice';
import userService from '../services/UserService';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const token = useSelector(state => state.auth.authToken);
    const [imageUrl, setImageUrl] = useState(null);
    const userId = useSelector(state => state.auth.userId);
    let [isAuthor, setIsAuthor] = useState(false);
    const dispatch = useDispatch();
    const [postAuthor, setPostAuthor] = useState(null);

    const deletePost = async () => {
        const response = await postService.deletePost(post.id, token);
        if (response) {
            dispatch(deleteMyPost(post.id))
            navigate('/my-posts');
        } else {
            navigate(`/post/${post.id}`);
        }
    }

    useEffect(() => {
        (async function getPostById() {
            const response = await postService.getPostById(id, token);
            if (response) {
                setPost(response);

                // check this post is upload by the current user
                setIsAuthor((response.userId === userId));
                
                const result = await postService.getPostImage(id, token);
                const imageUrl = URL.createObjectURL(result);
                setImageUrl(imageUrl);

                const data = await userService.getUserById(response.userId, token);
                setPostAuthor(data);
                setLoading(false);
            } else {
                navigate("/");
            }
        })();
    }, [id, navigate, postAuthor]);
    
    if (loading) {
        return (
            <div className="spinner-box">
                <div className="three-quarter-spinner"></div>
            </div> 
        )
    } else {
        return post ? (
            <div className='post-container'>
                <div className="author-profile">
                    <img 
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s' 
                    alt={`${postAuthor.fullName}'s profile`} 
                    className="author-image" 
                    />
                    <span className="author-username">{postAuthor.fullName}</span>
                </div>
                <div className='post-image'>
                    <img 
                        src={imageUrl} 
                        alt={post.title} 
                    />

                    {isAuthor ? (
                        <div className='post-actions'>
                            <Link to={`/edit-post/${post.id}`}>
                                <Button>
                                    Edit
                                </Button>
                            </Link>
                            <button onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    ): null}
                </div>
                <div className='post-title'>
                    <h1>{post.title}</h1>
                </div>
                <div className='post-content'>
                    {parser(post.content)}
                </div>
            </div>
        ) : null;
    }
}

export default Post;
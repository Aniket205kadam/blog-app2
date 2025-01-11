import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postService from '../services/PostService';
import PostCard from '../components/PostCard';
import '../MyPost.css';
import { setMyPost } from '../store/postSlice';

function MyPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.authToken);
  const [noPost, setNoPost] = useState(false);
  const previousPosts = useSelector(state => state.post.myPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (previousPosts.length <= 0) {
      (async function getMyPosts() {
        if (isAuthenticated) {
          const reponse = await postService.getMyPost(token);
          if (reponse.length === 0) {
            setNoPost(true);
          }
          else{
            setPosts(reponse);
            dispatch(setMyPost(reponse));
          }
          setLoading(false);
        } else {
          navigate("/login");
        }
      })();
    } else {
      setPosts(previousPosts);
      setLoading(false);
    }
  }, [previousPosts, isAuthenticated, token, postService, dispatch, navigate]);

  const handleAddPostClick = () => {navigate("/add-post")}

  if (loading) {
    return <div>Loading...</div>
  } else if (noPost) {
    return (
      <div className="my-posts-container">
            <h1 className="text-center text-2xl font-bold mb-6">My Posts</h1>
            <div className="posts-grid grid grid-cols-2 gap-4">
                <img 
                    src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="developer image" 
                    className="post-image rounded shadow-lg" 
                />
                <img 
                    src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="server image" 
                    className="post-image rounded shadow-lg" 
                />
                <img 
                    src="https://images.pexels.com/photos/30111690/pexels-photo-30111690/free-photo-of-teenager-engaged-in-virtual-reality-experience.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Vision Pro" 
                    className="post-image rounded shadow-lg" 
                />
                <img 
                    src="https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Central Processing Unit" 
                    className="post-image rounded shadow-lg" 
                />
            </div>
            <div className="text-center mt-6">
                <button 
                    onClick={handleAddPostClick} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Add New Post
                </button>
            </div>
        </div>
    )
  } else {
    return (
      <div>
        <div>
          {
            posts.map(post => (
              <div key={post.id}>
                <PostCard {...post} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default MyPost;
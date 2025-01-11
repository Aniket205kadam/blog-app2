import React, { useEffect, useState } from 'react';
import postService from '../services/PostService';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { setOtherPost } from '../store/postSlice';

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.authToken);
  const previousPosts = useSelector(state => state.post.otherPosts);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (previousPosts.length <= 0) {
      const fetchPosts = async () => {
        const reponse = await postService.getAllPost(token);
        setPosts(reponse);
        dispatch(setOtherPost(reponse));
        setLoading(false);
      }
      fetchPosts();
    } else {
      setPosts(previousPosts);
      setLoading(false);
    }
  }, [previousPosts, isAuthenticated, navigate]);

  if (loading) {
    return <div>Loading...</div>
  }
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

export default AllPost;
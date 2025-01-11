import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postService from '../services/PostService';
import AddPost from '../components/AddPost';
import { useSelector } from 'react-redux';

function EditPost() {
  const [post, setPost] = useState(null);  
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.authToken);

  useEffect(() => {
    if (id) {
        postService.getPostById(id, token)
        .then((response) => {
                if (response) setPost(response)
            });
    } else {
        navigate('/');
    }
  }, [id, navigate]);

  return post ? (
    <div className='py-8'>
        <AddPost post={post} />
    </div>
  ) : null;
}

export default EditPost;
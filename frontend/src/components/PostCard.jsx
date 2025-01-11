import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import postService from '../services/PostService';
import { Link } from 'react-router-dom';

function PostCard({
    id,
    title,
}) {
    // TODO: replace the a tag with the Link in react-router
    const token = useSelector(state => state.auth.authToken);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        async function getImage() {
            const response = await postService.getPostImage(id, token);
            const imageUrl = URL.createObjectURL(response);
            setImageUrl(imageUrl);  
        }
        getImage();
    }, []);

    return (
        <Link 
            className='post-card-link'
            to={`/post/${id}`}
        >
            <div className='post-card-container'>
                post
                <div>
                    <img 
                        src={imageUrl} 
                        alt={title}
                        />
                </div>
                <h2 className='post-card-title'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;
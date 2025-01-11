import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { data, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from './Input';
import Button from './Button';
import RTE from './RTE';
import postService from '../services/PostService';
import "../AddForm.css";
import PostModel from '../models/Post';
import Checkbox from './Checkbox';
import { updateMyPost, addMyPost } from '../store/postSlice';

function AddPost({ post }) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || ''
        }
    });
    const navigate = useNavigate();
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.authToken);
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
       (async function getImage() {
        if (post) {
            const response = await postService.getPostImage(post.id, token);
            const url = URL.createObjectURL(response);
            setImageUrl(url);
        }
       })();
    }, [])

    const onSubmit = async (data) => {
        setLoading(true);
        // update
        if (post) {
           const newPost = new PostModel();
           newPost.title = data.title;
           newPost.content = data.content;
           const response = await postService.editPost(newPost, post.id,data.isImageChanged, data.image[0], token);
           if (response) {
            navigate(`/post/${response.id}`);
            dispatch(updateMyPost(response));
           } else {
            navigate(`/edit-post/${post.id}`);
           }
        }
        // save post
        else {
            const file = data.image[0];
            if (file) {
                const newPost = new PostModel();
                newPost.title = data.title;
                newPost.content = data.content;
                const response = await postService.uploadPost(newPost, file, token);
                if (response) {
                    setLoading(false);
                    dispatch(addMyPost(response))
                    navigate(`/post/${response.id}`)
                }
            }
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className='w-2/3 px-2'>
                <Input 
                    label="Title: "
                    placeholder="Enter your post title"
                    className=""
                    {...register("title", {
                        required: true
                    })}
                />
                <RTE 
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className='w-1/3 px-2'>
                    <Input 
                        label="Post Image: "
                        type="file"
                        className=''
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", {
                            required: !post
                        })}
                    />
                    {post && (
                        <div className='w-full mb-4'>
                            <img 
                                src={imageUrl} 
                                alt={post.title}
                                className='' 
                            />
                        </div>
                    )}
                    {post && (
                        <Checkbox
                            label="I'm updating the image."
                            type="checkbox"
                            {...register("isImageChanged")}
                        />
                    )}
                    <Button
                        type='submit'
                    >
                        {
                        loading
                        ?
                        <div className="button-loading">
                            <div className="login-loading"></div>
                        </div>
                        :
                        post ? (<b>Update</b>) : (<b>Submit</b>)
                        }
                    </Button>
            </div>
        </form>
    )
}

export default AddPost
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import User from '../models/User';
import userService from '../services/UserService';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

function Signup() {
    const [error, setError] = useState();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const signup = async (data) => {
        setError("");
        setLoading(true);
        try {
            const user = new User(data.name, data.username, data.email, data.password);
            const respone = await userService.registerUser(user);
            dispatch(login({username: respone.user.username, userId: respone.user.id, authToken: respone.token}));
            // TODO: redirect to the Home page
            
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className='auth-container'>
            <h1 className='signup-title'>Sign Up</h1>
            {loading ?  <p className="loading">Loading...</p> : null}
            {error && <p className='auth-error'>{error.message}</p>}
            <form className='auth-form' onSubmit={handleSubmit(signup)}>
            <Input
                label='Full name: '
                placeholder='Enter your full name'
                {...register('name', {
                    required: true
                })}
            />
            <Input
                label='Username: '
                placeholder='Enter your unique username'
                {...register('username', {
                    required: true,
                })}
                onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, "");
                    e.target.value = value;
                }}
            />
            <Input
                label='Email: '
                type='email'
                placeholder='Enter your email address'
                {...register('email', {
                    required: true,
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address"
                    }
                })}
            />
            <Input
                label='password: '
                type='password'
                placeholder='Enter your password'
                {...register('password', {
                    required: true,
                })}
                onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, "");
                    e.target.value = value;
                }}
            />
            <Button
                type="submit"
            >Create Account</Button>
            </form>
        </div>
    )
}

export default Signup;
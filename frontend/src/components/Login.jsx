import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import userService from '../services/UserService';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const signin = async (data) => {
        setError('');
        setLoading(true);
        try {
            const respones = await userService.loginUser(data.username, data.password);
            dispatch(login({username: data.username, userId: respones.user.id, authToken: respones.token}));
            // TODO: redirect to home page
        } catch (error) {
            setError(error.message);
        }
       
    }

    return (
        <div className='auth-container'>
            <h1 className='login-title'>Login</h1>
            {loading ? <p className='loading'>Loading...</p> : null}
            {error && <p className='auth-error'>{error}</p>}
           <form className='auth-form' onSubmit={handleSubmit(signin)}>
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
            >Sign in</Button>
           </form>
        </div>
    )
}

export default Login;
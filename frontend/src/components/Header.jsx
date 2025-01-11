import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { removeMyPosts, removeOtherPosts } from '../store/postSlice';

function Header() {
    const authStatus = useSelector(state => state.auth.isAuthenticated);
    const navItem = [
        {
            name: 'Home',
            url: '/',
            active: true
        },
        {
            name: 'Login',
            url: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            url: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            url: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            url: '/add-post',
            active: authStatus
        },
        {
            name: 'My Posts',
            url: '/my-posts',
            active: authStatus
        }
    ];
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        dispatch(removeMyPosts());
        dispatch(removeOtherPosts());
    }
    const navigate = useNavigate();

    return (
        <header>
            <nav>
                <div>
                    <Link
                        to="/"
                    >
                        {/* Logo */}
                        <img src='https://cdn-icons-png.flaticon.com/128/9360/9360864.png' className='logo' />
                    </Link>
                </div>
                <ul>
                    {
                        navItem.map(item => 
                            item.active ?
                            <li key={item.name}>
                                <button onClick={() => {navigate(item.url)}}>{item.name}</button>
                            </li>
                            : null
                        )
                    }
                    { authStatus && (
                        <li>
                            <button 
                                onClick={logoutHandler}
                            >Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
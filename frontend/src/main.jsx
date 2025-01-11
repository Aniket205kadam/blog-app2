import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import AllPost from './pages/AllPost.jsx';
import Post from './components/Post.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import Home from './pages/Home.jsx';
import AddPost from './components/AddPost.jsx';
import MyPost from './pages/MyPost.jsx';
import EditPost from './pages/EditPost.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication={true}>
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path: '/post/:id',
        element: (
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/my-posts',
        element: (
          <AuthLayout authentication={true}>
            <MyPost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:id',
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

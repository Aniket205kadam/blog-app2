# <b>Blog App with React and Spring Boot</b>
A full-stack blog application built with React on the frontend and Spring Boot on the backend. The frontend is deployed on Vercel, the backend is deployed on Render, and Neon Database is used for data storage. This app allows users to create, read, update, and delete blog posts.

## <b>Features:</b>
- User authentication with JWT
- CRUD operations for blog posts
- Responsive UI with React and React Router DOM
- Spring Boot backend with PostgreSQL database
- Deployed frontend on Vercel and backend on Render

## <b>Technologies Used:</b>
- Frontend: React, React Router DOM, CSS
- Backend: Spring Boot, Spring Data JPA, PostgreSQL
- Database: Neon Database (hosted PostgreSQL)
- Authentication: JWT
- Deployment:
    - Frontend: Vercel
    - Backend: Render
    - Database: Neon

## <b>Setup Instructions:</b>
1. Clone the repository.
2. Backend:
    - Set up your Neon PostgreSQL Database and configure environment variables (DATASOURCE_URL, DATASOURCE_USERNAME, DATASOURCE_PASSWORD).
    - Deploy the backend on Render.
3. Frontend:
    - Configure the frontend to connect to the backend's API.
    - Deploy the frontend on Vercel.

## <b>Environment Variables:</b>
- Frontend:
    - BACKEND_API_URL: URL of the deployed backend API (e.g., https://your-backend-url.com).
- Backend:
    - DATASOURCE_URL: Neon database URL.
    - DATASOURCE_USERNAME: Neon database username.
    - DATASOURCE_PASSWORD: Neon database password.
    - FRONTEND_URL: URL of the deployed frontend (e.g., https://your-frontend-url.com).
## <b>Deployment:</b>
- The frontend is deployed on Vercel: [Frontend Live Link](https://deploy-blog-app-frontend.vercel.app/)
- The backend is deployed on Render: [Backend Live Link](https://blog-app-backend-9yyy.onrender.com)
import AppConfig from "../config/AppConfig";

class UserService {
    // sign up
    registerUser = async (user) => {
        if (!user) {
            throw new Error("Pass user object in registerUser method")
        }
        const apiUrl = `${AppConfig.blogAppAPI}/signup`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: user.fullName, 
                    username: user.username, 
                    email: user.email, 
                    password: user.password
                })
            })
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error || 'Failed to register user');
            }
            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error.message);
            throw error;
        }
    }
    // sign in
    loginUser = async (username, password) => {
        if (!username && !password) {
            throw new Error("Enter username and password");
        }
        const apiUrl = `${AppConfig.blogAppAPI}/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(!response.ok) {
                throw new Error("Username and password are not correct!");
            }
            return await response.json();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // get user by id
    getUserById = async (userId, token) => {
        if (!userId && !password) {
            throw new Error("userId or token is empty");
        }
        const apiUrl = `${AppConfig.blogAppAPI}/api/v1/users/profile/${userId}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.status) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error("get user by id get error");
            throw error;
        }
    }
}

export default new UserService();
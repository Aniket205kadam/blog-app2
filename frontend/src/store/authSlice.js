import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authToken: null,
    username: null,
    userId: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.authToken = action.payload.authToken;
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.authToken = null;
            state.username = null;
            state.userId = null;
            state.isAuthenticated = false;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myPosts: [],
    otherPosts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setMyPost: (state, action) => {
            state.myPosts = action.payload;
        },
        setOtherPost: (state, action) => {
            state.otherPosts = action.payload;
        },
        addMyPost: (state, action) => {
            state.myPosts.push(action.payload);
        },
        deleteMyPost: (state, action) => {
            state.myPosts = state.myPosts.filter(post => post.id !== action.payload);
        },
        updateMyPost: (state, action) => {
            const index = state.myPosts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.myPosts[index] = action.payload;
            }
        },
        removeMyPosts: (state) => {
            state.myPosts = [];
        },
        removeOtherPosts: (state) => {
            state.otherPosts = [];
        }
    }
});

export const { setMyPost, setOtherPost, addMyPost, deleteMyPost, updateMyPost, getMyPosts, getOtherPosts, removeMyPosts, removeOtherPosts} = postSlice.actions;
export default postSlice.reducer;
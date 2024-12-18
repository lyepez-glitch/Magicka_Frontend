// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        username: '',
        email: '',
        avatar: '', // Add avatar to state
    },
    reducers: {
        setUser(state, action) {
            return {...state, ...action.payload };
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
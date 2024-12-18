// src/redux/powersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const powersSlice = createSlice({
    name: 'powers',
    initialState: [],
    reducers: {
        setPowers(state, action) {
            return action.payload;
        },
    },
});

export const { setPowers } = powersSlice.actions;
export default powersSlice.reducer;
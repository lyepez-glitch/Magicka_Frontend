// src/redux/attackHistorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const attackHistorySlice = createSlice({
    name: 'attackHistory',
    initialState: [],
    reducers: {
        addAttack(state, action) {
            state.push(action.payload);
        },
    },
});

export const { addAttack } = attackHistorySlice.actions;
export default attackHistorySlice.reducer;
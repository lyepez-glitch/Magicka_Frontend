// src/redux/energySlice.js
import { createSlice } from '@reduxjs/toolkit';

const energySlice = createSlice({
    name: 'energy',
    initialState: {
        level: 100,
        max: 100,
    },
    reducers: {
        updateEnergy(state, action) {
            state.level = action.payload.level;
            state.max = action.payload.max;
        },
        consumeEnergy(state, action) {
            state.level = Math.max(0, state.level - action.payload.amount);
        },
        rechargeEnergy(state, action) {
            state.level = Math.min(state.max, state.level + action.payload.amount);
        },
    },
});

export const { updateEnergy, consumeEnergy, rechargeEnergy } = energySlice.actions;
export default energySlice.reducer;
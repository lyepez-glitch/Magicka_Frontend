// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import energyReducer from './energySlice';
import powersReducer from './powerSlice';
import attackHistoryReducer from './attackHistorySlice'; // Import the attack history reducer

const store = configureStore({
    reducer: {
        user: userReducer,
        energy: energyReducer,
        powers: powersReducer,
        attackHistory: attackHistoryReducer, // Add it to the store
    },
});

export default store;
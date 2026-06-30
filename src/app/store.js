import {configureStore} from '@reduxjs/toolkit';
import goalsReducer from '../features/goals/goalsSlice';


export const store = configureStore({
  reducer: {
    goals: goalsReducer,
  },
});
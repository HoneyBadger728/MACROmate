import {configureStore} from '@reduxjs/toolkit';
import goalsReducer from '../features/goals/goalsSlice';
import pantryReducer from '../features/pantry/pantrySlice';


export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    pantry: pantryReducer,
  },
});
import {configureStore} from '@reduxjs/toolkit';
import goalsReducer from '../features/goals/goalsSlice';
import pantryReducer from '../features/pantry/pantrySlice';
import mealEntriesReducer from '../features/meals/mealEntriesSlice'
import { saveState, loadState } from './localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    pantry: pantryReducer,
    mealEntries: mealEntriesReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    goals: store.getState().goals,
    pantry: store.getState().pantry,
    mealEntries: store.getState().mealEntries,
  });
});
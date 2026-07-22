import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
};

const goalsSlice = createSlice({
    name: 'goals',
    initialState,   
    reducers: {
        updateGoals: (state, action) => {
            state.calories = action.payload.calories;
            state.protein = action.payload.protein;
            state.carbs = action.payload.carbs;
            state.fat = action.payload.fat;    
        },
    },
});

export const { updateGoals } = goalsSlice.actions;
export default goalsSlice.reducer;
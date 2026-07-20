import { createSlice } from "@reduxjs/toolkit";

const initialState =  [];

const mealEntriesSlice = createSlice({
    name: "mealEntries",
    initialState,
    reducers: {
        addMealEntry: (state, action) => {
            state.push(action.payload);
        },

        deleteMealEntry: (state, action) => {
            return state.filter(
                (entry) => entry.id !== action.payload
            );
        },
    },
});

export const { addMealEntry, deleteMealEntry} = mealEntriesSlice.actions;

export default mealEntriesSlice.reducer;
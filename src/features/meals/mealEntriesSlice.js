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

        editMealEntryQuantity: (state, action) => {
            const updatedEntry = action.payload;

            const existingEntry = state.find(
                (entry) => entry.id === updatedEntry.id
            );

            if (existingEntry) {
                existingEntry.quantityGrams = updatedEntry.quantityGrams;
            }
        },
    },
});

export const { addMealEntry, deleteMealEntry, editMealEntryQuantity} = mealEntriesSlice.actions;

export default mealEntriesSlice.reducer;
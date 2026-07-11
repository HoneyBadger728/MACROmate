import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const pantrySlice = createSlice({
    name: "pantry",
    initialState,
    reducers: {
        addPantryItem: (state, action) => {
            state.push(action.payload);
        },

        editPantryItem: (state, action) => {
            const updatedItem = action.payload;

            const existingItem = state.find(
                (item) => item.id === updatedItem.id 
            );

            if (existingItem) {
                existingItem.name = updatedItem.name;
                existingItem.caloriesPer100g = updatedItem.caloriesPer100g;
                existingItem.proteinPer100g = updatedItem.proteinPer100g;
                existingItem.carbsPer100g = updatedItem.carbsPer100g;
                existingItem.fatPer100g = updatedItem.fatPer100g;
            }
        },

        deletePantryItem: (state, action) => {
            return state.filter(
                (item) => item.id !== action.payload
            );
        },

    },
});

export const { addPantryItem, editPantryItem, deletePantryItem } = pantrySlice.actions;

export default pantrySlice.reducer;
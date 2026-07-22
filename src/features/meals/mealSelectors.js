import { createSelector } from "@reduxjs/toolkit";

const selectMealEntries = (state) => state.mealEntries;
const selectPantryItems = (state) => state.pantry;
const selectGoals = (state) => state.goals;

export const selectMealTotals = createSelector( 
    [selectMealEntries, selectPantryItems],
    (mealEntries, pantryItems) => {
  
        return mealEntries.reduce(
            (totals, entry) => {
                const food = pantryItems.find(
                    (item) => item.id === entry.foodId
                );

                if (!food) {
                    return totals;
                }

                const quantityMultiplier = entry.quantityGrams / 100;
        
                totals.calories += food.caloriesPer100g * quantityMultiplier;
                totals.protein += food.proteinPer100g * quantityMultiplier;
                totals.carbs += food.carbsPer100g * quantityMultiplier;
                totals.fat += food.fatPer100g * quantityMultiplier;

                return totals;
            },
            {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
            }
        );
    }
)

export const selectRemainingMacros = createSelector(
    [selectGoals, selectMealTotals], 
    (goals, totals) => {
   
        return {
            calories: goals.calories - totals.calories,
            protein: goals.protein - totals.protein,
            carbs: goals.carbs - totals.carbs,
            fat: goals.fat - totals.fat,
        };
    }
);
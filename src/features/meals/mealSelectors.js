

export function selectMealTotals(state) {
    const mealEntries = state.mealEntries;
    const pantryItems = state.pantry;

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
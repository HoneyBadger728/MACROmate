import { normalizeToOneDecimal } from "./formatNumbers";

function getNutrientValue(foodNutrients, nutrientId) {
    const nutrient = foodNutrients.find(
        (item) => item.nutrientId === nutrientId
    );

    return nutrient?.value ?? null;
}

export function normalizeUsdaFood(food) {
    const nutrients = food.foodNutrients;

    const protein = getNutrientValue(nutrients, 1003);
    const carbs = getNutrientValue(nutrients, 1005);
    const fat = getNutrientValue(nutrients, 1004);
    const calories =
        getNutrientValue(nutrients, 1008) ??
        getNutrientValue(nutrients, 2048) ??
        getNutrientValue(nutrients, 2047);

    const macros = [ protein, carbs, fat, calories ]
    if (macros.some(value => value === null || value < 0)) {
        return null;
    }

    return {
        id: `usda-${food.fdcId}`,
        name: food.description,
        caloriesPer100g: Math.round(calories),
        proteinPer100g: normalizeToOneDecimal(protein),
        carbsPer100g: normalizeToOneDecimal(carbs),
        fatPer100g: normalizeToOneDecimal(fat)
        
    };
}


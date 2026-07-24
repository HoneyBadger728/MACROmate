

export function calculateMaximumWithinTargets(food, remaining) {
    const constraints = [];

    if (food.caloriesPer100g > 0) {
        const maxGrams = remaining.calories / (food.caloriesPer100g / 100);

        constraints.push({
            macro: "calories",
            maxGrams: maxGrams,
        });
    }

    if (food.proteinPer100g > 0) {
        const maxGrams = remaining.protein / (food.proteinPer100g / 100);

        constraints.push({
            macro: "protein",
            maxGrams: maxGrams,
        });
    }

     if (food.carbsPer100g > 0) {
        const maxGrams = remaining.carbs / (food.carbsPer100g / 100);

        constraints.push({
            macro: "carbs",
            maxGrams: maxGrams,
        });
    }

     if (food.fatPer100g > 0) {
        const maxGrams = remaining.fat/ (food.fatPer100g / 100);

        constraints.push({
            macro: "fat",
            maxGrams: maxGrams,
        });
    }

    if (constraints.length === 0) {
        return {
            maxGrams: null,
            limitingFactors: [],
        };
    }

    const maxGramValues = constraints.map(
        ({ maxGrams }) => maxGrams
    );

    const smallestMaxGrams = Math.min(...maxGramValues);

    const limitingFactors = constraints.filter(
        (constraint) => constraint.maxGrams === smallestMaxGrams).map(
            (constraint) => constraint.macro
        );

    return {
        maxGrams: smallestMaxGrams,
        limitingFactors: limitingFactors,
    };
}


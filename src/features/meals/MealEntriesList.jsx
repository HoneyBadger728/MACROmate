import { useSelector } from "react-redux";

function MealEntriesList() {
    const mealEntries = useSelector((state) => state.mealEntries);
    const pantryItems = useSelector((state) => state.pantry);

    if (mealEntries.length === 0) {
        return <p>No foods added to Today's Meals yet.</p>;
    }

    return (
        <section>
            {mealEntries.map((entry) => {
                const food = pantryItems.find(
                    (item) => item.id === entry.foodId 
                );

                if (!food) {
                    return null
                }

                const quantityMultiplier = entry.quantityGrams / 100;
                const calories = food.caloriesPer100g * quantityMultiplier;
                const protein = food.proteinPer100g * quantityMultiplier;
                const carbs = food.carbsPer100g * quantityMultiplier;
                const fat = food.fatPer100g * quantityMultiplier;

                return (
                    <article key={entry.id}>
                        <h3>{food.name}</h3>

                        <p>Quantity: {entry.quantityGrams}g</p>
                        <p>Calories: {calories}</p>
                        <p>Protein: {protein}</p>
                        <p>Carbs: {carbs}</p>
                        <p>Fat: {fat}</p>
                    </article>
                );
            })}
        </section>
    );
}

export default MealEntriesList;
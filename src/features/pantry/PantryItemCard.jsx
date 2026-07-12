

function PantryItemCard({ item }) {
    return (
        <article>
            <h3>{item.name}</h3>

            <p>Calories: {item.caloriesPer100g}</p>
            <p>Protein: {item.proteinPer100g}</p>
            <p>Carbs: {item.carbsPer100g}</p>
            <p>Fat: {item.fatPer100g}</p>

            <p>Nutrition per 100g</p>
        </article>
    );
}

export default PantryItemCard;

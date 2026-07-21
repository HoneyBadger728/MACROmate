import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMealEntry, editMealEntryQuantity } from "./mealEntriesSlice";

function MealEntryCard({ entry, food }) {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [quantityGrams, setQuantityGrams] = useState(entry.quantityGrams);

    const quantityMultiplier = (Number(quantityGrams) || 0) / 100;
    
    const calories = food.caloriesPer100g * quantityMultiplier;
    const protein = food.proteinPer100g * quantityMultiplier;
    const carbs = food.carbsPer100g * quantityMultiplier;
    const fat = food.fatPer100g * quantityMultiplier;

    function handleQuantityChange(event) {
        const value = event.target.value;

        setQuantityGrams(value === "" ? "" : Number(value));
    }

    function handleSave() {
        if (quantityGrams === "" || quantityGrams <=0) {
            return;
        }

        dispatch(
            editMealEntryQuantity({
                id: entry.id,
                quantityGrams: quantityGrams,
            })
        );

        setIsEditing(false);
    }

    function handleDelete() {
        dispatch(deleteMealEntry(entry.id));
    }

    return (
        <article>
            <h3>{food.name}</h3>

            <label>
                Quantity:
                <input 
                    type="number"
                    min="0"
                    step="any"
                    value={quantityGrams}
                    disabled={!isEditing}
                    onChange={handleQuantityChange}
                />
                g
            </label>

            <p>Calories: {calories}</p>
            <p>Protein: {protein}</p>
            <p>Carbs: {carbs}</p>
            <p>Fat: {fat}</p>

            { isEditing ? (
                <button
                    type="button"
                    onClick={handleSave}
                >
                    Save Changes
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
            )}

            <button
                type="button"
                onClick={handleDelete}
            >
                Remove
            </button>
        </article>
    );
}

export default MealEntryCard;
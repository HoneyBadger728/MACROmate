import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMealEntry, editMealEntryQuantity } from "./mealEntriesSlice";
import "./MealEntryCard.css";

function MealEntryCard({ entry, food }) {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [quantityGrams, setQuantityGrams] = useState(entry.quantityGrams);

    const quantityMultiplier = (Number(quantityGrams) || 0) / 100;
    
    const calories = food.caloriesPer100g * quantityMultiplier;
    const protein = food.proteinPer100g * quantityMultiplier;
    const carbs = food.carbsPer100g * quantityMultiplier;
    const fat = food.fatPer100g * quantityMultiplier;

    const quantityUnit = "g";
    const macroUnit = "g";

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
        <article className="meal-card">
            <h3 className="meal-card__name">{food.name}</h3>
            
            <div className="meal-card__controls">
                <label className="meal-card__quantity">
                    <span className="meal-card__quantity-label">Quantity</span> 
                        
                        
                    <input 
                        className="meal-card__quantity-input"
                        type="number"
                        min="0"
                        step="any"
                        value={quantityGrams}
                        disabled={!isEditing}
                        onChange={handleQuantityChange}
                    />   
                        
                    <span className="meal-card__quantity-unit">{quantityUnit}</span>   
                </label>

                <div className="meal-card__actions">
                    { isEditing ? (
                        <button
                            className="meal-card__action meal-card__action--save"
                            type="button"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="meal-card__action meal-card__action--edit"
                            type="button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                    )}

                    <button
                        className="meal-card__action meal-card__action--remove"
                        type="button"
                        onClick={handleDelete}
                    >
                        Remove
                    </button>
                </div>
            </div>
            
            <div className="meal-card__macros">
                <div className="meal-card__macro meal-card__macro--calories">
                    <span className="meal-card__macro-label">Calories</span>
                    <span className="meal-card__macro-value">{calories}</span>
                </div>
                
                <div className="meal-card__macro meal-card__macro--protein">
                    <span className="meal-card__macro-label">Protein</span>
                    <span className="meal-card__macro-value">{protein}
                        <span className="meal-card__macro-unit">{macroUnit}</span>
                    </span>
                </div>
                
                <div className="meal-card__macro meal-card__macro--carbs">
                    <span className="meal-card__macro-label">Carbs</span>
                    <span className="meal-card__macro-value">{carbs}
                        <span className="meal-card__macro-unit">{macroUnit}</span>
                    </span>
                </div>
                
                <div className="meal-card__macro meal-card__macro--fat">
                    <span className="meal-card__macro-label">Fat</span>
                    <span className="meal-card__macro-value">{fat}
                        <span className="meal-card__macro-unit">{macroUnit}</span>
                    </span>
                </div>
            </div>
            

        </article>
    );
}

export default MealEntryCard;
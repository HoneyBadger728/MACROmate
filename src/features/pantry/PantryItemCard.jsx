import { useState } from "react";


function PantryItemCard({ item, isExpanded, onToggle }) {
    const [quantityGrams, setQuantityGrams] = useState(100);

    const quantityMultiplier = quantityGrams / 100;
    
    const displayedCalories = item.caloriesPer100g * quantityMultiplier;
    const displayedProtein = item.proteinPer100g * quantityMultiplier;
    const displayedCarbs = item.carbsPer100g * quantityMultiplier;
    const displayedFat = item.fatPer100g * quantityMultiplier;

    function handleQuantityChange(event) {
        setQuantityGrams(Number(event.target.value));
    }

    function handleQuantityFocus() {
        if(!isExpanded) {
            onToggle();
        }
    }

    return (
        <article>
            <h3>{item.name}</h3>
            
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? `Collapse ${item.name}` : `Expand ${item.name}`}
            >
                <span aria-hidden="true">
                    {isExpanded ? "▲" : "▼"}
                </span>
            </button>
            
            <label>
                Quantity:
                <input 
                    type="number"
                    min="0"
                    step="any"
                    value={quantityGrams}
                    onChange={handleQuantityChange}
                    onFocus={handleQuantityFocus} 
                />
                g
            </label>

            <p>Calories: {displayedCalories}</p>
            <p>Protein: {displayedProtein}</p>
            <p>Carbs: {displayedCarbs}</p>
            <p>Fat: {displayedFat}</p>

           

            {isExpanded && (
                <div>
                    <button type="button">
                        Add to Today's Meals
                    </button>

                    <button type="button">
                        Edit Food
                    </button>

                    <button type="button">
                        Delete Food
                    </button>
                </div>
            )}
        </article>
    );
}

export default PantryItemCard;

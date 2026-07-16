import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPantryItem } from "./pantrySlice";

function PantryItemCard({ item, isExpanded, onToggle }) {
    
    const dispatch = useDispatch();

    const [quantityGrams, setQuantityGrams] = useState(100);
    const [isEditing, setIsEditing] = useState(false);
    const [editFood, setEditFood] = useState({
        name: item.name,
        caloriesPer100g: item.caloriesPer100g,
        proteinPer100g: item.proteinPer100g,
        carbsPer100g: item.carbsPer100g,
        fatPer100g: item.fatPer100g,
    });

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

    function handleStartEditing() {
        setEditFood({
            name: item.name,
            caloriesPer100g: item.caloriesPer100g,
            proteinPer100g: item.proteinPer100g,
            carbsPer100g: item.carbsPer100g,
            fatPer100g: item.fatPer100g,
        });

        setQuantityGrams(100);
        setIsEditing(true);
    }

    function handleEditChange(event) {
        const { name, value } = event.target;

        setEditFood({
            ...editFood,
            [name]: value,
        });
    }

    function handleSaveEditing() {
        if (!editFood.name.trim()) {
            alert("Please enter a valid food name.");
            return;
        }

        dispatch(
            editPantryItem({
                id: item.id,
                name: editFood.name.trim(),
                caloriesPer100g: Number(editFood.caloriesPer100g),
                proteinPer100g: Number(editFood.proteinPer100g),
                carbsPer100g: Number(editFood.carbsPer100g),
                fatPer100g: Number(editFood.fatPer100g),
            })
        );

        setIsEditing(false);
    }

    function handleToggleCard() {
        if (isExpanded && isEditing) {
            setIsEditing(false);
        }

        onToggle();
    }

    return (
        <article>
            {isEditing ? (
                <input 
                    type="text"
                    name="name"
                    value={editFood.name}
                    onChange={handleEditChange}
                />
            ) : (
                <h3>{item.name}</h3>
            )}

            <button
                type="button"
                onClick={handleToggleCard}
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
                    disabled={isEditing}
                    onChange={handleQuantityChange}
                    onFocus={handleQuantityFocus} 
                />
                g
            </label>

            <label>
                Calories:
                <input 
                    type="number"
                    name="caloriesPer100g"
                    min="0"
                    step="any"
                    value={
                        isEditing ? editFood.caloriesPer100g : displayedCalories
                    }
                    disabled={!isEditing}
                    onChange={handleEditChange} 
                /> 
            </label>

            <label>
                Protein:
                <input 
                    type="number"
                    name="proteinPer100g"
                    min="0"
                    step="any"
                    value={
                        isEditing ? editFood.proteinPer100g : displayedProtein
                    }
                    disabled={!isEditing}
                    onChange={handleEditChange} 
                /> 
            </label>

            <label>
                Carbs:
                <input 
                    type="number"
                    name="carbsPer100g"
                    min="0"
                    step="any"
                    value={
                        isEditing ? editFood.carbsPer100g : displayedCarbs
                    }
                    disabled={!isEditing}
                    onChange={handleEditChange} 
                /> 
            </label>

            <label>
                Fat:
                <input 
                    type="number"
                    name="fatPer100g"
                    min="0"
                    step="any"
                    value={
                        isEditing ? editFood.fatPer100g : displayedFat
                    }
                    disabled={!isEditing}
                    onChange={handleEditChange} 
                /> 
            </label>
          
           

            {isExpanded && (

                isEditing ? (
                    <button type="button" onClick={handleSaveEditing}>
                    Save Changes
                    </button>
                ) : (
                <div>
                    <button type="button">
                        Add to Today's Meals
                    </button>

                    <button type="button" onClick={handleStartEditing}>
                        Edit Food
                    </button>

                    <button type="button">
                        Delete Food
                    </button>
                </div>
                ) 
            )}

               
        </article>
    );
}

export default PantryItemCard;

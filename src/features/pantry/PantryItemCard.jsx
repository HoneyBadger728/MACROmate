import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPantryItem, deletePantryItem } from "./pantrySlice";
import  DeleteConfirmationModal  from "./DeleteConfirmationModal";
import { addMealEntry } from "../meals/mealEntriesSlice";

function PantryItemCard({ item, isExpanded, onToggle }) {
    
    const dispatch = useDispatch();
    const formErrorId = `edit-food-error-${item.id}`;

    const [quantityGrams, setQuantityGrams] = useState(100);
    const [isEditing, setIsEditing] = useState(false);
    const [formError, setFormError] = useState("");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editFood, setEditFood] = useState({
        name: item.name,
        caloriesPer100g: item.caloriesPer100g,
        proteinPer100g: item.proteinPer100g,
        carbsPer100g: item.carbsPer100g,
        fatPer100g: item.fatPer100g,
    });

    useEffect(() => {
        if (!isExpanded) {
            setIsEditing(false);
            setFormError("");
        }
    }, [isExpanded]);

    const quantityMultiplier = (Number(quantityGrams) || 0) / 100;
    
    const displayedCalories = item.caloriesPer100g * quantityMultiplier;
    const displayedProtein = item.proteinPer100g * quantityMultiplier;
    const displayedCarbs = item.carbsPer100g * quantityMultiplier;
    const displayedFat = item.fatPer100g * quantityMultiplier;

    function handleQuantityChange(event) {
        const value = event.target.value;

        setQuantityGrams(
            value === "" ? "" : Number(value)
        );
    }

    function handleQuantityFocus() {
        if(!isExpanded) {
            onToggle();
        }
    }

    function handleStartEditing() {
        setFormError("");

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

        if (formError) {
            setFormError("");
        }
    }

    function handleSaveEditing(event) {
        event.preventDefault();

          if (!isEditing) {
            return;
        }

        if (!editFood.name.trim()) {
            setFormError("Please enter a valid food name.");
            return;
        }

        setFormError("");

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
        onToggle();
    }

    function handleDelete() {
        dispatch(deletePantryItem(item.id))
        setIsDeleteOpen(false);
    }

    function handleAddToMeals() {
        if (quantityGrams === "" || quantityGrams <= 0) {
            return;
        }
        
        const mealEntry = {
            id: crypto.randomUUID(),
            foodId: item.id,
            quantityGrams: quantityGrams,
        };

        dispatch(addMealEntry(mealEntry));

    }

    return (
        <article>
            <form onSubmit={handleSaveEditing}>
                {isEditing ? (
                    <label>
                        Food Name:
                        <input 
                            type="text"
                            name="name"
                            required
                            value={editFood.name}
                            onChange={handleEditChange}
                            aria-describedby={
                                formError ? formErrorId : undefined
                            }
                        />
                    </label>
                ) : (
                    <h3>{item.name}</h3>
                )}

                {formError && (
                    <p id={formErrorId} role="alert">
                        {formError}
                    </p>
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
                        required
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
                        required
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
                        required
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
                        required
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
                        <button type="submit">
                        Save Changes
                        </button>
                    ) : (
                    <div>
                        <button type="button" onClick={handleAddToMeals}>
                            Add to Today's Meals
                        </button>

                        <button type="button" onClick={handleStartEditing}>
                            Edit Food
                        </button>

                        <button type="button" onClick={() => setIsDeleteOpen(true)}>
                            Delete Food
                        </button>
                    </div>
                    ) 
                )}
            </form>
            {isDeleteOpen && (
                <DeleteConfirmationModal
                    itemName={item.name}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleDelete}
                />
            )}       
        </article>
    );
}

export default PantryItemCard;

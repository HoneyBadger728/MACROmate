import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPantryItem, deletePantryItem } from "./pantrySlice";
import  DeleteConfirmationModal  from "./DeleteConfirmationModal";
import EditNutritionWarningModal from "./EditNutritionWarningModal";
import { addMealEntry } from "../meals/mealEntriesSlice";
import { selectRemainingMacros } from "../meals/mealSelectors";
import { calculateMaximumWithinTargets } from "./pantrySelectors";
import { normalizeFoodName } from "./pantryUtils";
import "./PantryItemCard.css";

function PantryItemCard({ item, isExpanded, onToggle }) {
    
    const dispatch = useDispatch();
    const formErrorId = `edit-food-error-${item.id}`;

    const [quantityGrams, setQuantityGrams] = useState(100);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditWarningOpen, setIsEditWarningOpen] = useState(false);
    const [formError, setFormError] = useState("");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editFood, setEditFood] = useState({
        name: item.name,
        caloriesPer100g: item.caloriesPer100g,
        proteinPer100g: item.proteinPer100g,
        carbsPer100g: item.carbsPer100g,
        fatPer100g: item.fatPer100g,
    });

    const quantityUnit = "g";
    const macroUnit = "g";
    

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

    const goals = useSelector((state) => state.goals);
    const remaining = useSelector(selectRemainingMacros);
    const mealEntries = useSelector((state) => state.mealEntries);
    const pantryItems = useSelector((state) => state.pantry);

    const guidance = calculateMaximumWithinTargets(item, remaining);
    const displayedMaxGrams = guidance.maxGrams === null ? null : Math.floor(guidance.maxGrams);

    const affectedMealCount = mealEntries.filter(
        meal => meal.foodId === item.id
    ).length;

    const isUsedInMeals = affectedMealCount > 0;

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
        if (isUsedInMeals) {
            setIsEditWarningOpen(true);
            return;
        }

        beginEditing();
    }

    function beginEditing() {
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

        const duplicateExists = pantryItems.some(
            (pantryItem) => 
                pantryItem.id !== item.id &&
                normalizeFoodName(pantryItem.name) === 
                normalizeFoodName(editFood.name)
        );

        if (duplicateExists) {
            setFormError("A pantry item with this name already exists.");
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
        const id = typeof globalThis.crypto?.randomUUID === "function"
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        
        if (quantityGrams === "" || quantityGrams <= 0) {
            return;
        }
        
        const mealEntry = {
            id,
            foodId: item.id,
            quantityGrams,
        };

        dispatch(addMealEntry(mealEntry));

    }

    return (
        <article className="pantry-card">
            <form className="pantry-card__form" onSubmit={handleSaveEditing}>
                <div className="pantry-card__header">
                    {isEditing ? (
                        <label className="pantry-card__name-field">
                            <span className="pantry-card__name-label">Food Name:</span>
                            <input 
                                className="pantry-card__name-input"
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
                        <h3 className="pantry-card__name">{item.name}</h3>
                    )} 
                </div>

                   {formError && (
                    <p 
                        className="pantry-card__error"
                        id={formErrorId} 
                        role="alert"
                    >
                        {formError}
                    </p>
                )}
                
                <div className="pantry-card__controls">
                    <button
                        className="pantry-card__toggle"
                        type="button"
                        onClick={handleToggleCard}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? `Collapse ${item.name}` : `Expand ${item.name}`}
                    >
                        <span aria-hidden="true">
                            {isExpanded ? "▲" : "▼"}
                        </span>
                    </button>
                

                    <label className="pantry-card__quantity">
                        <span className="pantry-card__quantity-label">Quantity:</span>
                        <input
                            className="pantry-card__quantity-input" 
                            type="number"
                            min="0"
                            step="any"
                            value={quantityGrams}
                            disabled={isEditing}
                            onChange={handleQuantityChange}
                            onFocus={handleQuantityFocus} 
                        />
                        <span className="pantry-card__quantity-unit">{quantityUnit}</span>
                    </label>
                </div>

                
                
                <div className="pantry-card__guidance">
                    {goals.isConfigured ? (
                        guidance.maxGrams === null ? (
                            <p className="pantry-card__guidance-text">No macro-based limit.</p>
                        ) : (
                            <>
                                <p className="pantry-card__max">
                                    <span className="pantry-card__max-label">
                                        Maximum Within Targets:
                                    </span> 
                                    <span className="pantry-card__max-value">
                                        {displayedMaxGrams}{quantityUnit}
                                    </span>
                                </p>

                                <p className="pantry-card__limiting">
                                    <span className="pantry-card__limiting-label">
                                        Limiting Factor
                                        {guidance.limitingFactors.length > 1 ? "s" : ""}:{" "}
                                    </span>
                                    <span className="pantry-card__limiting-value">
                                        {guidance.limitingFactors.join(", ")}
                                    </span>
                                </p>
                            </>
                        )
                    ) : (
                        <p className="pantry-card__guidance-text">
                            Set your macro goals to see planning guidance.
                        </p>
                    )}
                </div>

                {isExpanded && (
                    <div className="pantry-card__details">   
                        {isEditing && (
                            <p className="pantry-card__nutrition-edit-title">
                                Nutrition per 100g
                            </p>
                        )}
                       
                       <div className="pantry-card__nutrition">
                            <label className="pantry-card__macro pantry-card__macro--calories">
                                <span className="pantry-card__macro-label">
                                    Calories:
                                </span>
                                
                                <span className="pantry-card__macro-control">
                                    <input
                                    className="pantry-card__macro-input" 
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
                                </span>
                              
                            </label>

                            <label className="pantry-card__macro pantry-card__macro--protein">
                                <span className="pantry-card__macro-label">
                                    Protein:
                                </span>
                                
                                <span className="pantry-card__macro-control">
                                    <input
                                        className="pantry-card__macro-input"
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

                                    <span className="pantry-card__macro-unit">{macroUnit}</span>
                                </span> 
                            </label>

                            <label className="pantry-card__macro pantry-card__macro--carbs">
                                <span className="pantry-card__macro-label">
                                    Carbs:
                                </span>
                                
                                <span className="pantry-card__macro-control">
                                    <input
                                        className="pantry-card__macro-input"
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

                                    <span className="pantry-card__macro-unit">{macroUnit}</span>
                                </span>
                            </label>

                            <label className="pantry-card__macro pantry-card__macro--fat">
                                <span className="pantry-card__macro-label">
                                    Fat:
                                </span>
                                
                                <span className="pantry-card__macro-control">
                                    <input
                                        className="pantry-card__macro-input"
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
                                    <span className="pantry-card__macro-unit">{macroUnit}</span>
                                </span>
                            </label>
                        </div>
                        {isEditing ? (
                            <button 
                                className="pantry-card__action pantry-card__action--save"
                                type="submit"
                            >
                                Save Changes
                            </button>
                        ) : (
                            <div className="pantry-card__actions">
                                <button 
                                    className="pantry-card__action pantry-card__action--add"
                                    type="button" 
                                    onClick={handleAddToMeals}
                                >
                                    Add to Today's Meals
                                </button>

                                <button 
                                    className="pantry-card__action pantry-card__action--edit"
                                    type="button" 
                                    onClick={handleStartEditing}
                                >
                                    Edit Food
                                </button>

                                <button
                                    className="pantry-card__action pantry-card__action--delete" 
                                    type="button" 
                                    onClick={() => setIsDeleteOpen(true)}
                                >
                                    Delete Food
                                </button>
                            </div>
                        )}  
                    </div>
                )}
                
            </form>
            {isDeleteOpen && (
                <DeleteConfirmationModal
                    itemName={item.name}
                    isUsedInMeals={isUsedInMeals}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleDelete}
                />
            )}

            {isEditWarningOpen && (
                <EditNutritionWarningModal 
                    itemName={item.name}
                    affectedMealCount={affectedMealCount}
                    onCancel={() => setIsEditWarningOpen(false)}
                    onContinue={() => {
                        setIsEditWarningOpen(false);
                        beginEditing();
                    }}
                />
            )}       
        </article>
    );
}

export default PantryItemCard;

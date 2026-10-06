import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPantryItem } from "./pantrySlice";
import { normalizeFoodName } from "./pantryUtils";
import Modal from "../../components/Modal";
import { normalizeToOneDecimal } from "../../utils/formatNumbers";
import "./AddFoodModal.css"

function createPantryItem(formData) {
    const id = typeof globalThis.crypto?.randomUUID === "function"
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    return {
            id,
            name: formData.name.trim(),
            caloriesPer100g: Math.round(Number(formData.caloriesPer100g)),
            proteinPer100g: normalizeToOneDecimal(formData.proteinPer100g),
            carbsPer100g: normalizeToOneDecimal(formData.carbsPer100g),
            fatPer100g: normalizeToOneDecimal(formData.fatPer100g),
        };
}

function AddFoodModal({ onClose }) {
    const dispatch = useDispatch();

    const pantryItems = useSelector((state) => state.pantry);

    const [formError, setFormError] = useState("");
    const [newFood, setNewFood] = useState({
        name: "",
        caloriesPer100g: "",
        proteinPer100g: "",
        carbsPer100g: "",
        fatPer100g: "",
    });
    

    function handleChange(event) {
        const { name, value } = event.target;

        setNewFood({
            ...newFood,
            [name]: value,
        });

        if (formError) {
            setFormError("");
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!newFood.name.trim()) {
            setFormError("Please enter a valid food name.");
            return;
        }

        const duplicateExists = pantryItems.some(
            (item) => normalizeFoodName(item.name) === normalizeFoodName(newFood.name)
        );

        if (duplicateExists) {
            setFormError("A pantry item with this name already exists");
            return;
        }

        setFormError("");

        const pantryItem = createPantryItem(newFood);

        dispatch(addPantryItem(pantryItem));
        onClose();
    }
    
    
    return (
        <Modal
            title="Add Custom Food"
            titleId="add-custom-food-title"
            onClose={onClose}
        >
          
            <form className="add-food" onSubmit={handleSubmit}>
                <label className="add-food__field">
                    <span className="add-food__label">
                        Food Name
                    </span>
                    
                    <input 
                    className={`add-food__input${formError ? " add-food__input--error" : ""}`}
                    type="text"
                    name="name"
                    required
                    value={newFood.name}
                    onChange={handleChange}
                    aria-describedby={formError ? "add-food-error" : undefined}
                    aria-invalid={formError ? "true" : undefined} 
                    />
                </label>

                {formError && (
                    <p 
                        className="add-food__error"
                        id="add-food-error" 
                        role="alert">
                        {formError}    
                    </p>
                )}

                <p className="add-food__nutrition-title">
                    Nutrition per 100g
                </p>

                <div className="add-food__nutrition">
                    <label className="add-food__macro">
                        <span className="add-food__macro-label">
                            Calories
                        </span>
                            
                        <input
                        className="add-food__macro-input" 
                        type="number"
                        name="caloriesPer100g"
                        required
                        min="0"
                        step="1"
                        value={newFood.caloriesPer100g}
                        onChange={handleChange} 
                        />
                    </label>

                    <label className="add-food__macro">
                        <span className="add-food__macro-label">
                            Protein
                        </span>

                        <input 
                        className="add-food__macro-input" 
                        type="number"
                        name="proteinPer100g"
                        required
                        min="0"
                        step="0.1"
                        value={newFood.proteinPer100g}
                        onChange={handleChange} 
                        />
                    </label>

                    <label className="add-food__macro">
                        <span className="add-food__macro-label">
                            Carbs
                        </span>

                        <input
                        className="add-food__macro-input"  
                        type="number"
                        name="carbsPer100g"
                        required
                        min="0"
                        step="0.1"
                        value={newFood.carbsPer100g}
                        onChange={handleChange} 
                        />
                    </label>

                    <label className="add-food__macro">
                        <span className="add-food__macro-label">
                            Fat
                        </span>

                        <input
                        className="add-food__macro-input"  
                        type="number"
                        name="fatPer100g"
                        required
                        min="0"
                        step="0.1"
                        value={newFood.fatPer100g}
                        onChange={handleChange} 
                        />
                    </label>
                </div>
                
                <div className="modal__actions">
                    <button 
                        className="modal__action modal__action--primary"
                        type="submit"
                    >
                        Add to Pantry
                    </button>

                    <button 
                        className="modal__action modal__action--secondary"    
                        type="button" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    
    );
}

export default AddFoodModal;
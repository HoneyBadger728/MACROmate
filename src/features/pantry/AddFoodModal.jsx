import { useState } from "react";

function AddFoodModal({ onClose }) {
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
    };

    function handleSubmit(event) {
        event.preventDefault();

        console.log(newFood)
    };
    
    
    return (
        <section>
            <h3>Add Pantry Item</h3>

            <form onSubmit={handleSubmit}>
                <label>
                    Food Name:
                    <input 
                    type="text"
                    name="name"
                    value={newFood.name}
                    onChange={handleChange} 
                    />
                </label>

                <label>
                    Calories Per 100g:
                    <input 
                    type="number"
                    name="caloriesPer100g"
                    value={newFood.caloriesPer100g}
                    onChange={handleChange} 
                    />
                </label>

                <label>
                    Protein Per 100g:
                    <input 
                    type="number"
                    name="proteinPer100g"
                    value={newFood.proteinPer100g}
                    onChange={handleChange} 
                    />
                </label>

                <label>
                    Carbs Per 100g:
                    <input 
                    type="number"
                    name="carbsPer100g"
                    value={newFood.carbsPer100g}
                    onChange={handleChange} 
                    />
                </label>

                <label>
                    Fat Per 100g
                    <input 
                    type="number"
                    name="fatPer100g"
                    value={newFood.fatPer100g}
                    onChange={handleChange} 
                    />
                </label>

                <button type="submit">Save Food</button>

                <button type="button" onClick={onClose}> 
                Cancel    
                </button>
            </form>
        </section>
    )
}

export default AddFoodModal;
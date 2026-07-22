import { useState } from "react";
import PantryList from "../features/pantry/PantryList";
import AddFoodModal from "../features/pantry/AddFoodModal";
import MacroProgressFooter from "../components/MacroProgressFooter";

function PantryPage() {
    const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

    return (
        <main>  
            <h2>My Pantry</h2>

        <button type="button" onClick={() => setIsAddFoodOpen(true)}>
            Add Food
        </button>

        {isAddFoodOpen && (
            <AddFoodModal onClose={() => setIsAddFoodOpen(false)} />
        )}

            <PantryList />
            <MacroProgressFooter />
        </main>
    );
}

export default PantryPage;
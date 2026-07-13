import { useState } from "react";
import PantryList from "../features/pantry/PantryList";

function PantryPage() {
    const [isAddFoodOpen, setIsFoodOpen] = useState(false);

    return (
        <main>  
            <h2>My Pantry</h2>

        <button type="button" onClick={() => setIsFoodOpen(true)}>
            Add Food
        </button>

        {isAddFoodOpen && (
            <section>
                <h3>Add Pantry Item</h3>

                <button type="button" onClick={() => setIsFoodOpen(false)}>
                    Cancel
                </button>
            </section>
        )}

            <PantryList />
        </main>
    );
}

export default PantryPage;
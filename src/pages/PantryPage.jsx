import { useState } from "react";
import PantryList from "../features/pantry/PantryList";
import AddFoodModal from "../features/pantry/AddFoodModal";
import FindFoodsModal from "../features/pantry/FindFoodsModal";
import "./PantryPage.css"

function PantryPage() {
    const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
    const [isFindFoodsOpen, setIsFindFoodsOpen] = useState(false);

    return (
        <section className="pantry-page">  
            <div className="pantry-page__header">
                <h2 className="pantry-page__title">My Pantry</h2>

                <div className="pantry-page__actions">
                    <button
                        className="pantry-page__action pantry-page__action--find"
                        type="button"
                        onClick={() => setIsFindFoodsOpen(true)}
                    >
                        Find Foods
                    </button>
                    
                    <button 
                        className="pantry-page__action pantry-page__action--custom"
                        type="button" 
                        onClick={() => setIsAddFoodOpen(true)}
                    >
                        Custom Food
                    </button>
                </div>
            </div>

            {isAddFoodOpen && (
                <AddFoodModal onClose={() => setIsAddFoodOpen(false)} />
            )}

            {isFindFoodsOpen && (
                <FindFoodsModal onClose={() => setIsFindFoodsOpen(false)} />
            )}

            <PantryList />
        </section>
    );
}

export default PantryPage;
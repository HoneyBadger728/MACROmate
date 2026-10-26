import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PackageOpen } from "lucide-react";
import PantryItemCard from "./PantryItemCard";
import "./PantryList.css"

function PantryList({ newlyAddedItemId }) {
    const pantryItems = useSelector((state) => state.pantry);
    const [expandedItemId, setExpandedItemId] = useState(null);

    useEffect(() => {
        if (newlyAddedItemId === null) return;

        setExpandedItemId(newlyAddedItemId);
    }, [newlyAddedItemId])

    function handleToggle(itemId) {
        setExpandedItemId((currentId) => currentId === itemId ? null : itemId); 
    }

    return (
        <section className="pantry-list">
            {pantryItems.length === 0 ? (
                <section className="empty-state">
                    <PackageOpen 
                        className="empty-state__icon"
                        size={32}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />

                    <h2 className="empty-state__title">
                        Your Pantry is empty
                    </h2>
                    <p className="empty-state__description">
                        Add an item by searching Find Foods or
                        create a Custom Food entry.
                    </p>
                </section> 
            ) : (
                pantryItems.map((item) => (
                    <PantryItemCard 
                        key={item.id} 
                        item={item}
                        isExpanded={expandedItemId === item.id}
                        onToggle={() => handleToggle(item.id)}
                        focusOnAdd={newlyAddedItemId === item.id} 
                    />
                ))
            )}
        </section>
    ); 
}

export default PantryList;
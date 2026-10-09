import { useState } from "react";
import { useSelector } from "react-redux";
import { PackageOpen } from "lucide-react";
import PantryItemCard from "./PantryItemCard";
import "./PantryList.css"

function PantryList() {
    const pantryItems = useSelector((state) => state.pantry);
    const [expandedItemId, setExpandedItemId] = useState(null);

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
                    />
                ))
            )}
        </section>
    ); 
}

export default PantryList;
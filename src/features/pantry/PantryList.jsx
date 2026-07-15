import { useState } from "react";
import { useSelector } from "react-redux";
import PantryItemCard from "./PantryItemCard";

function PantryList() {
    const pantryItems = useSelector((state) => state.pantry);
    const [expandedItemId, setExpandedItemId] = useState(null);

    function handleToggle(itemId) {
        setExpandedItemId((currentId) => currentId === itemId ? null : itemId); 
    }

    return (
        <section>
            {pantryItems.map((item) => (
                <PantryItemCard 
                    key={item.id} 
                    item={item}
                    isExpanded={expandedItemId === item.id}
                    onToggle={() => handleToggle(item.id)} 
                />
            ))}
        </section>
    ); 
}

export default PantryList;
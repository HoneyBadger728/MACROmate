import { useSelector } from "react-redux";
import PantryItemCard from "./PantryItemCard";

function PantryList() {
    const pantryItems = useSelector((state) => state.pantry);

    return (
        <section>
            {pantryItems.map((item) => (
                <PantryItemCard key={item.id} item={item} />
            ))}
        </section>
    ); 
}

export default PantryList;
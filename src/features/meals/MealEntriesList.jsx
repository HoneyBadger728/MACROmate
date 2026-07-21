import { useSelector } from "react-redux";
import MealEntryCard from "./MealEntryCard";

function MealEntriesList() {
    const mealEntries = useSelector((state) => state.mealEntries);
    const pantryItems = useSelector((state) => state.pantry);

    
    function handleDeleteMealEntry(entryId) {
        dispatch(deleteMealEntry(entryId))
    }

    if (mealEntries.length === 0) {
        return <p>No foods added to Today's Meals yet.</p>;
    }

    return (
        <section>
            {mealEntries.map((entry) => {
                const food = pantryItems.find(
                    (item) => item.id === entry.foodId 
                );

                if (!food) {
                    return null
                }

                return (
                    <MealEntryCard 
                        key={entry.id}
                        entry={entry}
                        food={food}
                    />
                );
            })}
        </section>
    );
}

export default MealEntriesList;
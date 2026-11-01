import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MealEntryCard from "./MealEntryCard";
import { Utensils } from "lucide-react";
import "./MealEntriesList.css";
import "../../components/EmptyState.css";


function MealEntriesList() {
    const mealEntries = useSelector((state) => state.mealEntries);
    const pantryItems = useSelector((state) => state.pantry);


    const [focusTargetId, setFocusTargetId] = useState(null);
    const shouldFocusEmpty = useRef(false);
    const emptyHeadingRef = useRef(null);

    useEffect(() => {
        if (mealEntries.length === 0 && shouldFocusEmpty.current) {
            emptyHeadingRef.current?.focus();
            shouldFocusEmpty.current = false;
        }
    }, [mealEntries.length]);

    function handleEntryRemoved(removeId) {
        const index = mealEntries.findIndex((entry) => entry.id === removeId);
        const nextEntry = mealEntries[index + 1] ?? mealEntries[index - 1];

        if (nextEntry) {
            setFocusTargetId(nextEntry.id)
        } else {
            shouldFocusEmpty.current = true;
        }
    }

    if (mealEntries.length === 0) {
        return (
            <section className="empty-state">
                <Utensils
                    className="empty-state__icon"
                    size={32}
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
                
                <h2 
                    ref={emptyHeadingRef}
                    tabIndex={-1}
                    className="empty-state__title"
                >
                    No meals added yet
                </h2>
                <p className="empty-state__description">
                    Add an item from your Pantry to start tracking
                    today's meals.
                </p> 
            </section> 
        )
    }

    return (
        <section className="meal-list">
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
                        onRemove={handleEntryRemoved}
                        shouldFocus={focusTargetId === entry.id}
                        onFocusRestored={() => setFocusTargetId(null)}
                    />
                );
            })}    
        </section>
    );
}

export default MealEntriesList;
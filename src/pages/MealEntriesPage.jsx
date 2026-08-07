import MealEntriesList from "../features/meals/MealEntriesList";
import MacroProgressFooter from "../components/MacroProgressDock";

function MealEntriesPage() {
    return (
        <main>
            <h2>Today's Meals</h2>

            <MealEntriesList />
            <MacroProgressFooter />
        </main>
    );
}

export default MealEntriesPage;
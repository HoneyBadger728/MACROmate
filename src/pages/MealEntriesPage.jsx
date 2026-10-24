import MealEntriesList from "../features/meals/MealEntriesList";
import "./MealEntriesPage.css";


function MealEntriesPage() {
    return (
        <section className="meals-page">
            <h2 className="meals-page__title">Today's Meals</h2>

            <div className="meals-page__content">
                <MealEntriesList />
            </div>
        </section>
    );
}

export default MealEntriesPage;
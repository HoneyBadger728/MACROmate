import MealEntriesList from "../features/meals/MealEntriesList";
import MacroLogo from "../components/MacroLogo";
import "./MealEntriesPage.css";


function MealEntriesPage() {
    return (
        <section className="meals-page">
            <h2 className="meals-page__title">
                <MacroLogo size={26} />
                <span>Today's Meals</span>
            </h2>

            <div className="meals-page__content">
                <MealEntriesList />
            </div>
        </section>
    );
}

export default MealEntriesPage;
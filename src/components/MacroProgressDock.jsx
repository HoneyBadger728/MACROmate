import { useSelector } from "react-redux";
import { selectMealTotals } from "../features/meals/mealSelectors";
import "./MacroProgressDock.css";


function MacroProgressDock() {
    const totals = useSelector(selectMealTotals);
    const goals = useSelector((state) => state.goals)

    return (
        <section className="macro-dock" aria-label="Daily macro progress">
            <p className="macro-dock__item macro-dock__item--calories">
                <span className="macro-dock__label">Calories:</span> 
                <span className="macro-dock__value">
                    {totals.calories} / {goals.calories}
                </span>
            </p>

            <p className="macro-dock__item macro-dock__item--protein">
                <span className="macro-dock__label">Protein:</span> 
                <span className="macro-dock__value">
                    {totals.protein} / {goals.protein}
                </span>
            </p>

            <p className="macro-dock__item macro-dock__item--carbs">
                <span className="macro-dock__label">Carbss:</span> 
                <span className="macro-dock__value">
                    {totals.carbs} / {goals.carbs}
                </span>
            </p>

            <p className="macro-dock__item macro-dock__item--fat">
                <span className="macro-dock__label">Fat:</span> 
                <span className="macro-dock__value">
                    {totals.fat} / {goals.fat}
                </span>
            </p>
        </section>
    );
}

export default MacroProgressDock;
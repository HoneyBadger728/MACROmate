import { useSelector } from "react-redux";
import { selectMealTotals } from "../features/meals/mealSelectors";


function MacroProgressFooter() {
    const totals = useSelector(selectMealTotals);
    const goals = useSelector((state) => state.goals)

    return (
        <footer>
            <p>Calories: {totals.calories} / {goals.calories} </p>
            <p>Protein: {totals.protein} / {goals.protein}</p>
            <p>Carbs: {totals.carbs} / {goals.carbs}</p>
            <p>Fat: {totals.fat} / {goals.fat}</p>
        </footer>
    );
}

export default MacroProgressFooter;
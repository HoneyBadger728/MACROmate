import { useSelector } from "react-redux";
import { selectMealTotals } from "../features/meals/mealSelectors";

function MacroProgressFooter() {
    const totals = useSelector(selectMealTotals);

    return (
        <footer>
            <p>Calories: {totals.calories}</p>
            <p>Protein: {totals.protein}</p>
            <p>Carbs: {totals.carbs}</p>
            <p>Fat: {totals.fat}</p>
        </footer>
    );
}

export default MacroProgressFooter;
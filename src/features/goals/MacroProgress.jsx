import { useSelector } from "react-redux";
import { selectMealTotals } from "../meals/mealSelectors";
import { formatCalories, formatMacro } from "../../utils/formatNumbers";
import "./MacroProgress.css"

function MacroProgress() {
    const mealTotals = useSelector(selectMealTotals);
    const goals = useSelector((state) => state.goals);

    const macroUnit = "g"

    const macroProgress = [
        {
            key: "calories",
            label: "Calories",
            total: mealTotals.calories,
            goal: goals.calories,
            formatter: formatCalories,
            unit: ""
        },
        {
            key: "protein",
            label: "Protein",
            total: mealTotals.protein,
            goal: goals.protein,
            formatter: formatMacro,
            unit: macroUnit
        },
          {
            key: "carbs",
            label: "Carbs",
            total: mealTotals.carbs,
            goal: goals.carbs,
            formatter: formatMacro,
            unit: macroUnit
        },
          {
            key: "fat",
            label: "Fat",
            total: mealTotals.fat,
            goal: goals.fat,
            formatter: formatMacro,
            unit: macroUnit
        }
    ]

    if (!goals.isConfigured) {
        return null;
    }

    return (
        <section className="macro-progress">
            <h2 className="macro-progress__title">
                Today's Progress
            </h2>
            
            <div className="macro-progress__items">
                {macroProgress.map((macro) => {
                    const remaining = macro.goal - macro.total;

                    const progress = macro.goal > 0 
                        ? Math.min((macro.total / macro.goal) * 100, 100) 
                        : 0;

                    const isOver = remaining < 0;

                    return (
                        <div 
                            className="macro-progress__item"
                            key={macro.key}
                        >
                            <div className="macro-progress__header">
                                <span className="macro-progress__label">
                                    {macro.label}
                                </span>

                                <span 
                                    className={`macro-progress__status${
                                        isOver
                                            ? " macro-progress__status--over"
                                            : ""
                                    }`}
                                >
                                    {macro.formatter(Math.abs(remaining))}
                                    {macro.unit} {isOver ? "over" : "remaining"}
                                </span>
                            </div>

                      
                            <div className="macro-progress__track">
                                <div
                                    className={`macro-progress__fill macro-progress__fill--${macro.key}`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>  
                    );
                })}
            </div>
        </section>
    );
}

export default MacroProgress;
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateGoals} from './goalsSlice';

function GoalsForm() {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [formGoals, setFormGoals] = useState({
        calories: "",
        protein: "",
        carbs: "",
        fat:"",
    });

    const inputsDisabled = goals.isConfigured && !isEditing;

    function handleChange(event) {
        const {name, value} = event.target;

        setFormGoals({
            ...formGoals,
            [name]: value === "" ? "" : Number(value),
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(updateGoals(formGoals));
        setIsEditing(false);
    }

    function handleStartEditing() {
        event.preventDefault();

        setFormGoals({
            calories: goals.calories,
            protein: goals.protein,
            carbs: goals.carbs,
            fat: goals.fat,
        });

        setIsEditing(true);
    }


    return (
        <section>   
            <h2>Macro Goals</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Calories:
                    <input
                        type="number"
                        name="calories"
                        min="0"
                        step="any"
                        required
                        placeholder='e.g. 2000'
                        value={formGoals.calories}
                        disabled={inputsDisabled}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Protein:
                    <input
                        type="number"
                        name="protein"
                        min="0"
                        step="any"
                        required
                        placeholder='e.g. 200'
                        value={formGoals.protein}
                        disabled={inputsDisabled}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Carbs:
                    <input
                        type="number"
                        name="carbs"
                        min="0"
                        step="any"
                        required
                        placeholder='e.g. 75'
                        value={formGoals.carbs}
                        disabled={inputsDisabled}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Fat:
                    <input
                        type="number"
                        name="fat"
                        min="0"
                        step="any"
                        required
                        placeholder='e.g. 40'
                        value={formGoals.fat}
                        disabled={inputsDisabled}
                        onChange={handleChange}
                    />
                </label>

                {goals.isConfigured && !isEditing ? (
                    <button 
                        type='button'
                        onClick={handleStartEditing}
                    >
                        Update Goals
                    </button>  
                ) : (
                    <button type='submit'>
                        {goals.isConfigured ? "Save Changes" : "Set Goals"}
                    </button>
                )}
            </form>
        </section>
    );
};

export default GoalsForm;
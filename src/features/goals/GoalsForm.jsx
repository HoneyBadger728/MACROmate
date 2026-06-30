import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateGoals} from './goalsSlice';

function GoalsForm() {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();

    const [formGoals, setFormGoals] = useState(goals);

    function handleChange(event) {
        const {name, value} = event.target;

        setFormGoals({
            ...formGoals,
            [name]: Number(value),
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(updateGoals(formGoals));
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
                        value={formGoals.calories}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Protein:
                    <input
                        type="number"
                        name="protein"
                        value={formGoals.protein}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Carbs:
                    <input
                        type="number"
                        name="carbs"
                        value={formGoals.carbs}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Fat:
                    <input
                        type="number"
                        name="fat"
                        value={formGoals.fat}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Update Goals</button>
            </form>

            <h3>Saved Goals:</h3>
            <p>Calories: {goals.calories}</p>
            <p>Protein: {goals.protein}</p>
            <p>Carbs: {goals.carbs}</p>
            <p>Fats: {goals.fats}</p>
        </section>
    );
};

export default GoalsForm;
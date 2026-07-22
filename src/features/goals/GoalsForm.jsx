import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateGoals} from './goalsSlice';

function GoalsForm() {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();

    const [formGoals, setFormGoals] = useState({
        calories: "",
        protein: "",
        carbs: "",
        fat:"",
    });

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
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Update Goals</button>
            </form>

            <h3>Saved Goals:</h3>
            <p>Calories: {goals.calories}</p>
            <p>Protein: {goals.protein}</p>
            <p>Carbs: {goals.carbs}</p>
            <p>Fat: {goals.fat}</p>
        </section>
    );
};

export default GoalsForm;
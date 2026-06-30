import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateGoals} from './goalsSlice';

function GoalsForm() {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();

    const [formGoals, setFormGoals] = useState(goals);

    return (
        <section>   
            <h2>Macro Goals</h2>

            <p>Calories: {goals.calories}</p>
            <p>Protein: {goals.protein}</p>
            <p>Carbs: {goals.carbs}</p>
            <p>Fats: {goals.fats}</p>
        </section>
    );
};

export default GoalsForm;
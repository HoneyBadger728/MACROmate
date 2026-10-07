import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateGoals} from './goalsSlice';
import './GoalsForm.css'

function GoalsForm() {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();

    const macroUnit = "g";

    const [isEditing, setIsEditing] = useState(false);
    const [formGoals, setFormGoals] = useState({
        calories: goals.isConfigured ? goals.calories : "",
        protein: goals.isConfigured ? goals.protein : "",
        carbs: goals.isConfigured ? goals.carbs : "",
        fat: goals.isConfigured ? goals.fat : "",
    });

    const caloriesInputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            caloriesInputRef.current?.focus();
            caloriesInputRef.current?.select()
        }
    }, [isEditing])

    useEffect(() => {
        if (!goals.isConfigured) {
            setFormGoals({
                calories: "",
                protein: "",
                carbs: "",
                fat: "",
            });
            setIsEditing(false)
        }
    }, [goals.isConfigured]);
    
   
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
        
        const normalizedGoals = {
            calories: Math.round(formGoals.calories),
            protein:  Math.round(formGoals.protein),
            carbs:  Math.round(formGoals.carbs),
            fat:  Math.round(formGoals.fat),
        };

        dispatch(updateGoals(normalizedGoals));
        setFormGoals(normalizedGoals)
        setIsEditing(false);
    }

    function handleStartEditing() {
        
        setFormGoals({
            calories: goals.calories,
            protein: goals.protein,
            carbs: goals.carbs,
            fat: goals.fat,
        });

        setIsEditing(true);
    }


    return (
        <section className='goals'>   
            <div className='goals__header'>
                <h2 className='goals__title'>Daily Goals</h2>
                
                {goals.isConfigured && !isEditing && (
                    <button
                            className='goals__action goals__action--edit' 
                            type='button'
                            onClick={handleStartEditing}
                    >
                        Update Goals
                    </button> 
                )}

                {(!goals.isConfigured || isEditing) && (
                    <button 
                        className='goals__action goals__action--save'
                        type='submit'
                        form='goals__form'
                    >
                        {goals.isConfigured ? "Save Changes" : "Set Goals"}
                    </button>
                )}
            </div>

            <form 
                className='goals__form' 
                id='goals__form'
                onSubmit={handleSubmit}
            >
                <div className='goals__fields'>
                    <label className='goals__field goals__field--calories'>
                        <span className='goals__label'>Calories</span>
                        <input
                            ref={caloriesInputRef}
                            className='goals__input'
                            type="number"
                            name="calories"
                            min="0"
                            step="1"
                            required
                            placeholder='e.g. 2000'
                            value={formGoals.calories}
                            disabled={inputsDisabled}
                            onChange={handleChange}
                        />
                    </label>

                    <label className='goals__field goals__field--protein'>
                        <span className='goals__label'>Protein</span>
                        <div className='goals__input-control'>
                            <input
                                className='goals__input'
                                type="number"
                                name="protein"
                                min="0"
                                step="1"
                                required
                                placeholder='e.g. 200'
                                value={formGoals.protein}
                                disabled={inputsDisabled}
                                onChange={handleChange}
                            />
                            <span className='goals__unit'>{macroUnit}</span>
                        </div> 
                    </label>

                    <label className='goals__field goals__field--carbs'>
                        <span className='goals__label'>Carbs</span>
                        <div className='goals__input-control'>
                            <input
                                className='goals__input'
                                type="number"
                                name="carbs"
                                min="0"
                                step="1"
                                required
                                placeholder='e.g. 75'
                                value={formGoals.carbs}
                                disabled={inputsDisabled}
                                onChange={handleChange}
                            />
                            <span className='goals__unit'>{macroUnit}</span>
                        </div>
                    </label>

                    <label className='goals__field goals__field--fat'>
                        <span className='goals__label'>Fat</span>
                        <div className='goals__input-control'>
                            <input
                                className='goals__input'
                                type="number"
                                name="fat"
                                min="0"
                                step="1"
                                required
                                placeholder='e.g. 40'
                                value={formGoals.fat}
                                disabled={inputsDisabled}
                                onChange={handleChange}
                            />
                            <span className='goals__unit'>{macroUnit}</span>
                        </div>
                    </label>
                </div>

               
            </form>

         
        </section>
    );
};

export default GoalsForm;
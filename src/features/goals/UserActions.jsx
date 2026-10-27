import { useRef, useState } from "react";
import { clearMealEntries } from "../meals/mealEntriesSlice";
import Modal from "../../components/Modal";
import "./UserActions.css"
import { useDispatch } from "react-redux";

function UserActions() {
    const dispatch = useDispatch();

    const [isClearMealOpen, setIsClearMealOpen] = useState(false);
    const [isResetOpen, setIsResetOpen] = useState(false);

    const clearMealsCancelRef = useRef(null);
    const resetCancelRef = useRef(null);

    function handleClearMeals() {
        dispatch(clearMealEntries());
        setIsClearMealOpen(false);
    }

    function handleResetApp() {
        dispatch({type: "app/reset"});
        setIsResetOpen(false);
    }

    return (
        <section className="user-actions">
            <h2 className="user-actions__title">
                User Actions
            </h2>

            <div className="user-actions__buttons">
                <button
                    className="user-actions__button user-actions__button--clear"
                    type="button"
                    onClick={() => setIsClearMealOpen(true)}
                >
                    Clear Today's Meals
                </button>

                <button
                    className="user-actions__button user-actions__button--reset"
                    type="button"
                    onClick={() => setIsResetOpen(true)}
                >
                    Reset MACROmate
                </button>
            </div>

            {isClearMealOpen && (
                <Modal
                    title="Clear Today's Meals?"
                    titleId="clear-meals-title"
                    descriptionId="clear-meals-description"
                    onClose={() => setIsClearMealOpen(false)}
                    initialFocusRef={clearMealsCancelRef}
                >
                    <p
                        className="modal__description"
                        id="clear-meals-description"
                    >
                        This will remove all entries from Today's Meals.
                        Your Pantry and Daily Goals won't be changed.
                    </p>

                    <div className="modal__actions">
                        <button
                            className="modal__action modal__action--warning"
                            type="button"
                            onClick={handleClearMeals}
                        >
                            Clear Meals
                        </button>

                        <button
                            className="modal__action modal__action--secondary"
                            type="button"
                            ref={clearMealsCancelRef}
                            onClick={() => setIsClearMealOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}

            {isResetOpen && (
                <Modal
                    title="Reset MACROmate?"
                    titleId="reset-app-title"
                    descriptionId="reset-app-description"
                    onClose={() => setIsResetOpen(false)}
                    initialFocusRef={resetCancelRef}
                >
                    <p
                        className="modal__description"
                        id="reset-app-description"
                    >
                        This will permanently delete your Pantry, 
                        Today's Meals, and Daily Goals. This can't be undone. 
                    </p>

                    <div className="modal__actions">
                        <button
                            className="modal__action modal__action--danger"
                            type="button"
                            onClick={handleResetApp}
                        >
                            Reset MACROmate
                        </button>

                        <button
                            className="modal__action modal__action--secondary"
                            type="button"
                            ref={resetCancelRef}
                            onClick={() => setIsResetOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
        </section>
    );
}

export default UserActions;
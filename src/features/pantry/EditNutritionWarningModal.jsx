import Modal from "../../components/Modal";

function EditNutritionWarningModal({itemName, affectedMealCount, onCancel, onContinue}) {
    return (
        <Modal
            title="Edit Nutrition Information?"
            titleId="edit-nutrition-warning"
            descriptionId="edit-warning-description"
            onClose={onCancel}
        >
            <div id="edit-warning-description">
                <p>
                    <strong>{itemName}</strong> is currently used in{" "}
                    <strong>{affectedMealCount}</strong> meal 
                    {affectedMealCount === 1 ? " entry" : " entries"} in Today's Meals.
                </p>

                <p>
                    Changing this food's nutrition information will update the 
                    macro totals for {affectedMealCount === 1 ? "that meal entry" : "those meal entries"}.
                </p>

                <p>    
                    Meal quantities will not change.
                </p>
            </div>

            <div className="modal__actions">
                <button 
                    className="modal__action modal__action--warning"
                    type="button" 
                    onClick={onContinue}
                >
                    Continue Editing
                </button>

                <button 
                    className="modal__action modal__action--secondary"
                    type="button" 
                    onClick={onCancel}
                >
                    Cancel
                </button> 
            </div>
            
        </Modal>
    );
}

export default EditNutritionWarningModal;
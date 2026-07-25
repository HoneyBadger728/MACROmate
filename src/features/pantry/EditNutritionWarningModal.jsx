

function EditNutritionWarningModal({itemName, affectedMealCount, onCancel, onContinue}) {
    return (
        <div>
            <section
                className="modal"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="edit-nutrition-warning"
                aria-describedby="edit-warning-description"
            >
                <h2 id="edit-nutrition-warning">
                    Edit Nutrition Information?
                </h2>
                <div id="edit-warning-description">
                    <p>
                        <strong>{itemName}</strong> is currently used in {" "} 
                        <strong>{affectedMealCount}</strong> meal 
                        {affectedMealCount === 1 ? " entry" : " entries"} in Today's Meals.
                    </p>

                    <p>
                        Changing this food's nutrition information will update the 
                        macro totals for {affectedMealCount === 1 ? "that meal entry." : "those meal entries."}
                    </p>
                    
                    <p>
                        Meal quantities will not change.
                    </p>

                    <p>
                        Do you want to continue?
                    </p>
                </div>

                <div className="modal-actions">
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>

                    <button type="button" onClick={onContinue}>
                        Continue Editing
                    </button>
                </div>
            </section>
        </div>
    )
}

export default EditNutritionWarningModal;
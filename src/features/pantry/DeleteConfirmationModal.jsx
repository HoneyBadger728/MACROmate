

function DeleteConfirmationModal({itemName, isUsedInMeals, onConfirm, onClose}) {
    return (
        <div>
            <section
                className="modal"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-food-title"
                aria-describedby="delete-food-description"
            >
                <h2 id="delete-food-title">
                    {isUsedInMeals ? "Food is currently in use." : "Delete Food?"} 
                </h2>

                <p id="delete-food-description">
                    {isUsedInMeals ? (
                        <>
                            <strong>{itemName}</strong> is currently used in Today's Meals. 
                            Remove it from Today's Meals before deleting it from your pantry.
                        </>
                    ) : (
                        <>
                            Are you sure you want to delete <strong>{itemName}</strong> from your pantry?
                        </>
                    )}
                </p>

                <div className="modal-actions">
                    <button 
                        type="button" 
                        onClick={onClose}
                    >
                        Cancel 
                    </button>

                    <button 
                        type="button" 
                        onClick={onConfirm}
                        disabled={isUsedInMeals}    
                    >
                        Delete Food 
                    </button>
                </div>
            </section>
        </div>
    );
}

export default DeleteConfirmationModal;
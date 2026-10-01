import Modal from "../../components/Modal";

function DeleteConfirmationModal({
    itemName, 
    isUsedInMeals, 
    onConfirm, 
    onClose
}) {
    const title = isUsedInMeals
        ? "Food is currently in use" 
        : "Delete Food?";

    return (
        <Modal
            title={title}
            titleId="delete-food-title"
            descriptionId="delete-food-description"
            onClose={onClose}
        >
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

                <div className="modal__actions">
                    {isUsedInMeals ? (
                        <button
                            className="modal__action modal__action--secondary"
                            type="button"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    ) : (
                        <>
                            <button 
                                className="modal__action modal__action--danger"
                                type="button" 
                                onClick={onConfirm}    
                            >
                                Delete Food 
                            </button>
                        
                            <button
                                className="modal__action modal__action--secondary" 
                                type="button" 
                                onClick={onClose}
                            >
                                Cancel 
                            </button>
                        </>
                    )}
                </div>
        </Modal>
    );
}

export default DeleteConfirmationModal;
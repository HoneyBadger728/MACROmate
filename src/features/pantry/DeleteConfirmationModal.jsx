

function DeleteConfirmationModal({itemName, onConfirm, onClose}) {
    return(
        <div>
            <section
                className="modal"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-food-title"
                aria-describedby="delete-food-description"
            >
                <h2 id="delete-food-title">
                    Delete Food?
                </h2>

                <p id="delete-food-description">
                    Are you sure you want to delete <strong>{itemName}</strong> from your pantry?
                </p>

                <div className="modal-actions">
                    <button type="button" onClick={onClose}>
                        Cancel 
                    </button>

                    <button type="button" onClick={onConfirm}>
                        Delete Food 
                    </button>
                </div>
            </section>
        </div>
    );
}

export default DeleteConfirmationModal;
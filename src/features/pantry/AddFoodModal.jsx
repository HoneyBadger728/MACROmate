

function AddFoodModal({ onClose }) {
    return (
        <section>
            <h3>Add Pantry Item</h3>

            <button type="button" onClick={onClose}> 
            Cancel    
            </button>
        </section>
    )
}

export default AddFoodModal;
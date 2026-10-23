import { useState } from "react";
import Modal from "../../components/Modal";
import "./FindFoodsModal.css"

function FindFoodsModal({ onClose }) {
    const [query, setQuery] = useState("");

    return (
        <Modal
            title="Find Foods"
            titleId="find-foods-title"
            onClose={onClose}
        >
            <form 
                className="find-foods"
                onSubmit={(event) => event.preventDefault()}
            >
                <label 
                    className="find-foods__label"
                    htmlFor="find-foods-search"
                >
                    Search USDA Foods
                </label>

                <div className="find-foods__search">
                     <input
                        className="find-foods__input" 
                        id="find-foods-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search for a food..." 
                    />

                    <button
                        className="modal__action modal__action--primary" 
                        type="submit"
                    >
                        Search
                    </button> 
                </div>

                <div className="modal__actions">
                    <button
                        className="modal__action modal__action--secondary"
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default FindFoodsModal;
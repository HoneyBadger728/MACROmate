import { useState, useRef, useEffect, useCallback } from "react";
import { searchUsdaFoods } from "../../utils/searchUsdaFoods";
import Modal from "../../components/Modal";
import "./FindFoodsModal.css"

function FindFoodsModal({ onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const abortControllerRef = useRef(null);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleClose = useCallback(() => {
        abortControllerRef.current?.abort();
        onClose();
    }, [onClose])

    async function handleSubmit(event) {
        event.preventDefault();

        const searchTerm = query.trim();

        if (!searchTerm || isLoading) {
            return;
        }

        setResults([]);
        setSearchError("");
        setIsLoading(true);
        setHasSearched(false);

       const controller = new AbortController();
       abortControllerRef.current = controller;

        try {
            const foods = await searchUsdaFoods(searchTerm, controller.signal);
            setResults(foods);
            setHasSearched(true);
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }

            setSearchError("Unable to search USDA foods. Please try again.");
            console.error("USDA search failed", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Find Foods"
            titleId="find-foods-title"
            onClose={handleClose}
        >
            <form 
                className="find-foods"
                onSubmit={handleSubmit}
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
                        disabled={isLoading} 
                    >
                        {isLoading ? "Searching..." : "Search"}
                    </button> 
                </div>

                {isLoading && (
                    <p role="status">
                        Searching USDA foods...
                    </p>
                )}

                {searchError && (
                    <p role="alert">
                        {searchError}
                    </p>
                )}

                {!isLoading && results.length > 0 && (
                    <p role="status">
                        Found {results.length} foods.
                    </p>
                )}

                {!isLoading && results.length > 0 && (
                    <ul className="find-foods__results">
                        {results.map((food) => (
                            <li key={food.id}>
                                <p>{food.name}</p>
                                <p>
                                    {food.caloriesPer100g} kcal /
                                    P: {food.proteinPer100g} /
                                    C: {food.carbsPer100g} /
                                    F: {food.fatPer100g}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}

                {hasSearched && results.length === 0 && (
                    <p className="find-foods__empty" role="status">
                        No matching food items found. Try a different search term. 
                    </p>
                )}

                <div className="modal__actions">
                    <button
                        className="modal__action modal__action--secondary"
                        type="button"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default FindFoodsModal;
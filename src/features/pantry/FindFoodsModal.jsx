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
    const [expandedFoodId, setExpandedFoodId] = useState(null);

    const abortControllerRef = useRef(null);

    function handleToggleFood(foodId) {
        setExpandedFoodId(currentId =>
            currentId === foodId ? null : foodId
        );
    }

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
        setExpandedFoodId(null);
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

                <div className="modal__actions">
                    <button
                        className="modal__action modal__action--secondary"
                        type="button"
                        onClick={handleClose}
                    >
                        Cancel
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
                        Found {results.length} foods. Nutritional values per 100g.
                    </p>
                )}

                {!isLoading && results.length > 0 && (
                    <ul className="find-foods__results">
                        {results.map((food) => {
                            const isExpanded = expandedFoodId === food.id;
                            
                            return (
                                <li className="find-foods__result" key={food.id}>
                                    <button
                                        className="find-foods__result-toggle"
                                        type="button"
                                        aria-expanded={isExpanded}
                                        onClick={() => handleToggleFood(food.id)}
                                    >
                                        <span className="find-foods__result-header">
                                            <span className="find-foods__result-name">
                                                {food.name}
                                            </span>

                                            <span 
                                            className="find-foods__result-chevron"
                                            aria-hidden="true"
                                            >
                                                {isExpanded ? "▲" : "▼"}
                                            </span>
                                        </span>
                                       
                                    
                                        
                                        <span className="find-foods__result-macros">
                                            {[
                                                ["Calories", food.caloriesPer100g, "", "calories"],
                                                ["Protein", food.proteinPer100g, "g", "protein"],
                                                ["Carbs", food.carbsPer100g, "g", "carbs"],
                                                ["Fat", food.fatPer100g, "g", "fat"]
                                            ].map(([label, value, unit, type]) => (
                                                <span
                                                    className="find-foods__macro"
                                                    key={type}
                                                >
                                                    <span className="find-foods__macro-label">
                                                        {label}
                                                    </span>

                                                    <span className={`find-foods__macro-value find-foods__macro-value--${type}`}>
                                                        {value}{unit && <small>{unit}</small>}
                                                    </span>
                                                </span>
                                            ))}
                                        </span>
                                    </button>

                                    {isExpanded && (
                                        <div className="find-foods__result-details">
                                            <button
                                                className="modal__action modal__action--primary"
                                                type="button"
                                                disabled
                                            >
                                                Add to Pantry
                                            </button>
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                )}

                {hasSearched && results.length === 0 && (
                    <p className="find-foods__empty" role="status">
                        No matching food items found. Try a different search term. 
                    </p>
                )}

                
            </form>
        </Modal>
    );
}

export default FindFoodsModal;
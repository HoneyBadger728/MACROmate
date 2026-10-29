import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPantryItem } from "./pantrySlice";
import { searchUsdaFoods } from "../../utils/searchUsdaFoods";
import { normalizeFoodName } from "./pantryUtils";
import Modal from "../../components/Modal";
import "./FindFoodsModal.css"

function FindFoodsModal({ onClose, onFoodAdded }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [expandedFoodId, setExpandedFoodId] = useState(null);
    const [addError, setAddError] = useState("")

    const abortControllerRef = useRef(null);
    const expandedCardRef = useRef(null);
    const resultsRef = useRef(null);

    const dispatch = useDispatch();

    const pantryItems = useSelector((state) => state.pantry);


    function handleToggleFood(foodId) {
        setAddError("")

        setExpandedFoodId(currentId =>
            currentId === foodId ? null : foodId
        );
    }

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    useLayoutEffect(() => {
        if (expandedFoodId === null) return;
        
        const container = resultsRef.current;
        const card = expandedCardRef.current;

        if (!container || !card) return;

        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const topPadding = 8;
        const bottomPadding = 8;

        if (cardRect.top < containerRect.top + topPadding) {
            container.scrollTop -=
                containerRect.top + topPadding - cardRect.top;
        } else if (
            cardRect.height <= containerRect.height - topPadding - bottomPadding &&
            cardRect.bottom > containerRect.bottom - bottomPadding
        ) {
            container.scrollTop +=
                cardRect.bottom - containerRect.bottom + bottomPadding;
        }

    }, [expandedFoodId]);

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
        setAddError("");
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

    function handleAddToPantry(food) {
        const duplicateExists = pantryItems.some(
            item => normalizeFoodName(item.name) === normalizeFoodName(food.name)
        );

        if (duplicateExists) {
            setAddError("A pantry item with this name already exists.");
            return;
        }

        setAddError("");

        const id = typeof globalThis.crypto?.randomUUID === "function"
            ? globalThis.crypto?.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        const pantryItem = {
            id,
            name: food.name,
            caloriesPer100g: food.caloriesPer100g,
            proteinPer100g: food.proteinPer100g,
            carbsPer100g: food.carbsPer100g,
            fatPer100g: food.fatPer100g
        };

        dispatch(addPantryItem(pantryItem));
        onFoodAdded(pantryItem.id);
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
                    <p className="find-foods__results-length" role="status">
                        Found {results.length} foods. Nutritional values per 100g.
                    </p>
                )}

               
                {!isLoading && results.length > 0 && (
                    <ul className="find-foods__results" ref={resultsRef}>
                        {results.map((food) => {
                            const isExpanded = expandedFoodId === food.id;
                            
                            return (
                                <li 
                                    className="find-foods__result" 
                                    ref={isExpanded ? expandedCardRef : null}
                                    key={food.id}
                                >
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
                                             {addError && (
                                                <p className="find-foods__error" role="alert">
                                                    {addError}
                                                </p>
                                            )}

                                            <button
                                                className="modal__action modal__action--primary"
                                                type="button"
                                                onClick={() => handleAddToPantry(food)}
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
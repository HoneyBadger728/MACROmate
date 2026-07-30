

const STORAGE_KEY = "macromateState";

export function loadState() {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Could not load saved MACROmate data:", error);
        return undefined;
    }
    
}

export function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
    
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (error) {
        console.error("Could not save MACROmate data:", error);
    }
}
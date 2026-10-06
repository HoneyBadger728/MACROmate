

export function formatCalories(value) {
    return Math.round(Number(value) || 0);
}

export function formatMacro(value) {
    return Math.round((Number(value) || 0) * 10) / 10;
}

export function formatGrams(value) {
    return Math.round((Number(value) || 0) * 10) / 10;
}

export function normalizeGrams(value) {
    return Math.round((Number(value) || 0) * 10) / 10;
}

export function normalizeToOneDecimal(value) {
    return Math.round((Number(value) || 0) * 10) / 10;
}
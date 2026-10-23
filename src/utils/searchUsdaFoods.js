import { normalizeUsdaFood } from "./normalizeUsdaFood";

export async function searchUsdaFoods(query) {
    const url = new URL(
        "/api/usda/foods/search",
        window.location.origin
    );

    url.searchParams.set("query", query);
    url.searchParams.set("dataType", "Foundation,SR Legacy");
    url.searchParams.set("pageSize", '10');
   

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`USDA API request failed: ${response.status}`)
    }

    const data = await response.json();

    const normalizedFoods = data.foods
        .map(food => normalizeUsdaFood(food))
        .filter(food => food !== null);

    return normalizedFoods;
}

// searchUsdaFoods("chicken breast")
//     .then(foods => console.log("USDA results:", foods))
//     .catch(error => console.error(error)); 
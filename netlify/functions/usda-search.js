

export default async function handler(request) {
    if (request.method !== "GET") {
        return new Response("Method not allowed", {
            status: 405,
            headers: {Allow: "GET"}
        });
    }

    const requestUrl = new URL(request.url);
    const query = requestUrl.searchParams.get("query")?.trim();

    if (!query) {
        return Response.json(
            { error: "A search query is required." },
            { status: 400 }
        );
    }

    const apiKey = process.env.USDA_API_KEY;

    if  (!apiKey) {
        console.error("USDA_API_KEY is not configured");

        return Response.json(
            { error: "Food search is temporarily unavailable." },
            { status: 503 }
        );
    }

    const usdaUrl = new URL(
        "https://api.nal.usda.gov/fdc/v1/foods/search"
    );

    usdaUrl.searchParams.set("api_key", apiKey);
    usdaUrl.searchParams.set("query", query);
    usdaUrl.searchParams.set("dataType", "Foundation,SR Legacy");
    usdaUrl.searchParams.set("pageSize", "10");

    try {
        const response = await fetch(usdaUrl);

        if (!response.ok) {
            console.error("USDA request failed", response.status);

            return Response.json(
                { error: "Food search request failed." },
                { status: 502 }
            );
        }

        const data = await response.json();

        return Response.json(data);
    } catch (error) {
        console.error("USDA request error:", error);

        return Response.json(
            { error: "Unable to connect to the food database." },
            { status: 502 }
        );
    }
}
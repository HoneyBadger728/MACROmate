# Redux State Planning

## States Tracked

### Macro Goals
- Calorie Goal
- Protein Goal
- Carb Goal
- Fat Goal

### Pantry Items
- ID
- Name
- Calories per 100g
- Protein per 100g
- Carbs per 100g
- Fat per 100g

### Meal Entries
- ID
- Food ID
- Quantity

## Derived State / Calculated Values

### Current Totals
- Total Calories
- Total Protein
- Total Carbs
- Total Fat

### Remaining Targets
- Remaining Calories
- Remaining Protein
- Remaining Carbs
- Remaining Fat

### Pantry Guidance
- Max Amount Within Targets
- Limiting Factor

### Goal Progress
- Goals Met
- Goals Exceeded

## Open Questions


## Major Decisions

### Pantry Item Allowance

Decision:
- Each pantry item should be evaluated against all remaining targets (calories, protein, carbs, and fat).
- The maximum allowable quantity within targets should be the smallest valid quantity among those constraints.

Reasoning:
- A food may contain a predominant amount of one macro and none of another. 

Example:
- Olive oil contains no protein or carbs, so fat and calories must be used to determine maximum quantity allowed.

Status:
Approved

---

### Food Allowance After Targets Met

Decision:
- MACROmate should calculate the hard limit and display a "Maximum Within Targets" value.
- MACROmate should inform the user when displayed quantities do not fit within the targets.
- Users should be informed what specific target is being exceeded. 
- The user should still be able to add quantities that exceed target values.

Reasoning:
- Users should have maximum agency to plan their meals around the set goals. 
- MACROmate should provide the most accurate and helpful information without removing user control. 
- Users can see the running totals on each page to inform their decisions. 
- Users can edit previously logged food quantities within their daily meals to fit into their desired goals.

Example:
- Chicken Breast
    - Maximum Within Targets: 0g
    - Limiting Factor: Calories 

Additional Considerations:
- A visual change to current totals (displayed in fixed location) could represent when a target is met or exceeded so the user has some feedback to plan accordingly.
- Pantry item cards should not summarize running totals or entire daily status.
- Future versions may warrant consideration of adding planning guidance, meal suggestions based on target progression, and macro-priority filtering.     

Status:
Approved

---


## Data Modeling Decisions

### Meal Entry Data

Decision:
- Meal entries should reference current pantry items rather than preserving nutritional values.

Reasoning:
- App/coding simplicity for MVP scope.
- MVP app is a short-term meal planning tool and this most closely sticks to that core value.
- Pantry updates propagate throughout the app. 

Status:
Approved

---

### User Entered Quantities

Decision: 
- Users will specify item quantities in grams.

Reasoning:
- Displayed default quantities are set to grams.
- Calculations are more streamlined and avoid conversions. 

Status:
Approved

---

### Macro Goal Structure

Decision:
- User goals should be entered as single values.

Reasoning:
- Users can use discretion to tailor their decisions based on the targets entered.
- Single-value targets reduce complexity for MVP.
- Range-based goals could be added in a future release.

Status:
Approved

---

### Pantry Item Deletion

Decision: 
- Pantry items can't be deleted while they are referenced by current meal entries.

Reasoning:
- Meal entries reference pantry items instead of preserving data upon creation.

User Feedback:
- If the user attempts to delete a pantry item being referenced by a meal entry, MACROmate should provide a message explaining that the meal must be removed before deleting the pantry item.

Future Consideration:
- A later version may allow forced deletion upon user acknowledgement. 

Status:
Approved

---

### Pantry Item Editing

Decision:
- Pantry items that exist in Today's Meals requires user acknowledgement before saving changes.

Reasoning:
- To support above decision that meals reference current pantry items.

Status:
Approved

---

## Technical Decisions

### UI State Management

Decision:
- UI-specific state will remain local to React components for MACROmate MVP.
- Redux will be reserved for shared application state.

Reasoning:
- Most UI state is only needed by a single component. 
- Local useState reduces unnecessary complexity in MVP.
- Shared application data benefits from centralized Redux management. 

Future Considerations:
- A uiSlice may be introduced if multiple unrelated components need to share UI state, for example:
    - Global notifications
    - Active filters
    - Search terms

Status:
Approved

---

## Proposed State Structure
```js
{

    macroGoals: {
        calories: 2000,
        protein: 200,
        carbs: 120,
        fat: 40
    },

    pantryItems: [
         {
        id: "food-1",
        name: "Chicken Breast",
        caloriesPer100g: 165,
        proteinPer100g: 31,
        carbsPer100g: 0,
        fatPer100g: 3.6
        }
    ],

    mealEntries: [ 
        {
            id: "meal-1",
            foodId: "food-1",
            quantityGrams: 200
        }
    ]
}
```

## Proposed Redux Slices

### goalsSlice

Stores:
- macroGoals

Responsibilities:
- update calorie goal
- update protein goal
- update carb goal
- update fat goal
- reset goal progress to default

---

### pantrySlice

Stores:
- pantryItems

Responsibilities:
- add pantry item
- edit pantry item
- delete pantry item
- block deletion if item is used in meal entries

Consideration:
User specified quantities, within the pantry, remain local UI state. Changing preview quantities should not alter stored meals, unless pantry item nutritional data is being changed. 

---

### mealEntriesSlice

Stores:
- mealEntries

Responsibilities:
- add meal entry 
- edit meal entry quantity
- remove meal entry
- clear all meal entries 

---


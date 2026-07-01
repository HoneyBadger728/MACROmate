# Architecture Notes

## Project Overview

MACROmate helps users decide what they can still eat while sticking to their set calorie and macro intake targets.

## Assumptions
- Users understand macronutrients and calories.
- Users are aware of their specific nutrition goals.
- Users have the ability to weigh their food in grams.
- Users maintain a relatively stable pantry of food items.
- Nutrition data can be accurately represented per 100g. 

## Major Decisions

### Single Page Application

Decision:
- React SPA

Reason:
- Faster user experience
- Good fit for React Router
- Portfolio friendly

Status:
Approved

---

### Pantry-Centered Workflow

Decision:
- Users add foods to a pantry first

Reason:
- Simplifies food selection
- Reflects real-world usage patterns

Status:
Approved

---

### Planner First, Tracker Second

Decision: 
- MACROmate will prioritize meal planning over macro tracking and food logging.

Reason: 
- The primary user need being served is the ability to determine what can still be eaten based on specified macro goals.

Status:
Approved

---

### Planner Logging Reset

Decision:
- MACROmate will not reset the logged data automatically for MVP. Users will reset the foods logged in Today's meals manually when they are ready for a new planning session.

Reason:
- This decision is in line with the previous major decision that MACROmate be a meal planner foremost. Automatic reset options would push MACROmate closer to daily tracker territory and is outside the scope of MVP.

Future Considerations:
- Saved daily plans
- Carryover categories
- Saved curated meals
- Optional date-based tracking
- User-defined reset options

Status:
Approved

---

## Data Modeling Decisions

### Standardized Nutrition Units

Decision:
- Store nutritional values based on 100g of the item.

Reason: 
- Simplifies macro calculations, food comparisons, and remaining-allowance calculations.

Notes: 
- User-facing displays may still show ounces, servings, grams, or other units in the future. 

Status:
Approved

---

### Macro Goal Structure

Decision:
- Nutrition goals should be stored as a single value.

Examples:
    - Single Value: 
        Protein Goal: 200g

    - Range:
        Protein Goal
        - Min: 180g
        - Max: 220g

Reasoning:
- Users will still be allowed to log items outside of their set goals. Single values give the user the same amount of agency and control. Ranges could become more useful if features are added outside the MVP scope.

Future Considerations:
- In addition to adding the ability to set ranges, users could be given the option to set min targets and max targets.
    
    Example:
        Protein goal = 200g
        Carb goal < 200g
        Fat goal > 35g
            

Status: 
- Approved

---

## UI Decisions

### Goal Summary Footer

Decision: 
- GoalsSummary from GoalsPage will be used as the basis of a footer for PantryPage and MealEntriesPage.

Reasoning:
- GoalsSummary would only need to be built once and could be augmented and reused as needed. 

Status:
Approved

---

### Pantry Macro Display

Decision:
- The values stored in My Pantry will be based on the nutrition units specified above. Each pantry item will be initialized to that value and updated instantly when the user enters a different quantity. 

Reason:
- Storing and rendering food items at the specified amount will keep calculations consistent and allow the user to preview realistic amounts of a given item with a set point of reference. 

Status:
Approved

---

### Primary Navigation

Decision:
- The MACROmate app logo serves as the application navigation to the landing page.
- The landing page is the Goals page.
- Navigation places Pantry on the left and Entries on the right of the MACROmate logo.  

Reasoning:
- Reflects workflow usage from left to right. 
- Reinforces MACROmate branding by making the logo centralized and a primary means of navigation.
- Aligns with common industry practice of making the app logo a navigation link to the landing page.  

Status:
Approved

---

## Open Questions

### Editing Meal Entries

Question:
- Should users edit meal quantities directly?
- Or should items be removed and re-added?

Status: 
- Deferred until implementation

---

### Duplicate Item Entries

Question:
- Should clicking add for two 100g items create two separate entries?
- Or should the items be merged into one 200g entry?

Current Thinking:
- Duplicate meal entries should remain separate rather than being merged.

Reasoning:
- MACROmate is intended to function as a meal-planning tool that is guided by set macro and calorie goals. 
- Separate entries provide better meal structuring and support future grouping features such as:
    - Breakfast
    - Lunch
    - Dinner
    - Snacks
    - Custom meal groupings
    - Meal Carryovers

Benefits:
- Preserves planning intent
- Supports future organization features
- More accurately reflects real-world usage 


Status:
- Under consideration and deferred until Redux state planning.

---

## Deferred Product Decisions

### Meal Categories

Deferred Decision:
- Should meals eventually be grouped into meal categories (breakfast, lunch, dinner, snack, custom, etc.)

Reason:
- Outside MVP scope.

Revisit:
- After meal-entry implementation.

---

### Splitting Function

Deferred Decision:
- Should the user have the option to log pantry items as split entries (i.e. splitting 300g of chicken breast over 3 meals)?

Reason:
- Outside MVP scope.


Revisit:
- After implementation of MVP.

---

### Global Status Footer

Deferred Decision:
- Should MACROmate implement a footer to display global goal status and feedback?

Examples:
- All Goals Met!
- Goals Still Need Meeting
- Calorie Goal Exceeded
- Protein Goal Not Yet Met

Reason:
- The information in MacroProgressFooter will already provide necessary feedback to the user.
- A global status would add complexity without improving functionality and is outside the scope of MVP.

Revisit:
- After MVP completion
- User testing 

---

### Flexible Calorie Limits

Deferred Decision:
- Should users be allowed to set flexibility with their calorie goal?

Example:
    Fixed Goal - Calorie Goal: 2000
    Fixed Progress 1 - Current Calories: 2050 (Calorie goal exceeded)
    Fixed Progress 2 - Current Calories: 1950 (Calorie goal not met)

    Flex Goal - Calorie Goal: 2000 Flex Calories: 200
    Flex Progress 1 - Current Calories: 2050 (Calorie goal met - flex goal not exceeded)
    Flex Progress 2 - Current Calories: 1950 (Calorie goal met - flex goal not exceeded)
    Flex Progress 3 - Current Calories: 1750 (Calorie goal not met)
    Flex Progress 4 - Current Calories: 2250 (Calorie goal met - flex goal exceeded)

Reason:
- Users can implement discretion when going over set calorie limits.
- Users can set calorie limit higher to adjust MACROmate suggestions to their changing preferences. 
- Outside the scope of MVP.  

Future Considerations:
- Adding flex calories would prevent frustration with having to dial-in exact macros to meet a rigid goal.
- A flex calorie budget would allow MACROmate to suggest item quantity up to the limit afforded by the flex calorie budget 

Revisit:
- After MVP release
- User testing 

---

## Wireframe Discoveries

### Dashboard

Need to show:
- Consumed daily calories and macros

Not simply remaining calories and macros

### Today's Meals

Need to show:
- Totals section

Consider adding fixed totals bar to both My Pantry and Today's Meals

## Future Enhancements

- Nutrition API
- Progress charts
- PWA support

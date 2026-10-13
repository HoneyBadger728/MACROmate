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

### Pantry References and Derived Nutrition Data

Decision: 
- Meal entries reference stored pantry items instead of storing independent copies of nutritional data.
- Each meal entry stores its own quantity in grams.
- Nutritional contributions to daily totals are calculated based on the referenced Pantry item's per-100g nutritional values and the entry's quantity.

Reasoning: 
- This allows a single source of truth for a given item's nutritional values. 
- Ensures that changes to a pantry item's nutritional values will be reflected in any meal entry calculations. 
- Prevents duplication of nutritional data which reduces the risk of inconsistencies. 
- Allows a given Pantry item to have multiple meal entries with unique quantities.

Implementation Considerations:
- Pantry items can't be deleted from the app if they are currently referenced in a meal entry.
- Changing the data of a pantry item that is currently referenced in a meal entry requires user acknowledgment as it will alter current daily totals.

Status:
Implemented 

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
Approved

---

## UI Decisions

### Goal Summary Footer --> MacroProgressDock

Decision: 
- GoalsSummary from GoalsPage will be used as the basis of a footer for PantryPage and MealEntriesPage.

Reasoning:
- GoalsSummary would only need to be built once and could be augmented and reused as needed. 

Implementation Update:
- The original footer evolved into a dedicated component - MacroProgressDock
- MacroProgressDock is displayed above the bottom navigation and persists across the application's primary pages.
- The dock displays current planned calorie and macro totals, progress toward user-configured goals, and remaining allowances.   

Reasoning for Revision:
- Users benefit from seeing current totals across all pages of the application.
- A shared component that updates instantly allows for better UI consistency and user workflow.  
- The dock supports MACROmate's mobile-first design tenet. 

Status:
Implemented - revised from original decision

---

### Pantry Macro Display

Decision:
- The values stored in My Pantry will be based on the nutrition units specified above. Each pantry item will be initialized to that value and updated instantly when the user enters a different quantity. 

Reason:
- Storing and rendering food items at the specified amount will keep calculations consistent and allow the user to preview realistic amounts of a given item with a set point of reference. 

Implementation Clarification:
- Pantry items store nutritional data per 100g and allows users to preview nutritional contributions at user-specified quantities.
- Changing a pantry item's preview quantity from the default 100g will recalculate the displayed nutritional values without modifying stored item per-100g values.
- The specified quantity can then be added to Today's Meals, which instantly updates the `MacroProgressDock` component.    

Status:
Implemented as originally intended. 

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

Implementation Clarification:
- Navigation controls are fixed to the bottom of the MACROmate app which reinforces consistent behavior for user workflow and mobile-first design. 

Status:
Implemented as originally intended. 

---

## Resolved Design Decisions

### Editing Meal Entries

Question:
- Should users edit meal quantities directly?
- Or should items be removed and re-added?

Resolution:
- Users can edit meal quantities directly within the Today's Meals page without needing to remove and then re-add items.

Reasoning:
- Reduces unnecessary steps to adjust planned intake. 
- Preserves existing entries and allows users to experiment with different quantities. 
- Supports MACROmate's planning-first approach by making workflow convenient and non-restrictive.
- Users can see the daily totals and allowances change instantly after saving an adjusted meal quantity. 

Status: 
Resolved - Implemented

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

Resolution:
- Each added pantry item creates a separate meal entry instead of combining them. 
- Each meal entry stores its own quantity and can be edited or removed independently.

Resolution Reasoning:
- Preserves the user's intention when planning future meals or portions. 
- Allows quantities to be adjusted individually.
- Supports future potential future features like meal grouping without needing to redesign storage architecture.


Status:
Resolved - Implemented

---

## Deferred Product Decisions

### Meal Categories

Deferred Decision:
- Should meals eventually be grouped into meal categories (breakfast, lunch, dinner, snack, custom, etc.)

Reason:
- Outside MVP scope.

Revisit:
- After meal-entry implementation.

Implementation Status:
- Meal entries currently exist as individual entries without category grouping. 
- The decision to preserve each entry independently supports the implementation of category grouping in future updates. 

Updated Revisit:
- After MVP 1.0 and initial user feedback

Status:
Deferred - Post-MVP

---

### Splitting Function

Deferred Decision:
- Should the user have the option to log pantry items as split entries (i.e. splitting 300g of chicken breast over 3 meals)?

Reason:
- Outside MVP scope.


Revisit:
- After implementation of MVP.

Reasoning for Rejection:
- Current MACROmate architecture allows users to plan meals using individually stored quantities of items.
- The ability to add individual quantities already addresses the proposed functionality. 
- The limited convienience of implementing this feature does not justify adding interface complexity or greatly improve user workflow.   

Status:
Rejected - Redundant

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
- After MVP 1.0 release and initial feedback from user testing 

Implementation Status:
- The currently implemented MacroProgressDock (formerly MacroProgressFooter) persistently displays planned nutritional goals, progress toward configured goals, and remaining allowances.
- A separate global status message displaying overall goal completion has not been implemented.

Reasoning for Continued Deferral:
- The existing MacroProgressDock provides users the numerical feedback necessary to interpret progress toward set goals.
- An additional global component displaying status messaging could improve clarity but may introduce unnecessary visual clutter.
- The usefulness of this feature should be evaluated through user feedback.
- If user feedback indicates a need for status messaging, implementation within the Home page could be considered as an alternative to a persistent footer.

Status:
Deferred - Post-MVP

---

### Flexible Calorie Limits

Deferred Decision:
- Should users be allowed to set flexibility with their calorie goal?

Example:
    Fixed Goal - Calorie Goal: 2000
    Fixed Progress 1 - Current Calories: 2050 (Calorie goal exceeded)
    Fixed Progress 2 - Current Calories: 1950 (Calorie goal not met)

    Flex Goal - Calorie Goal: 2000 Flex Calories: 200
    Flex Progress 1 - Current Calories: 2050 (Calorie goal met and exceeded - flex goal not exceeded)
    Flex Progress 2 - Current Calories: 1950 (Calorie goal met - flex goal not exceeded)
    Flex Progress 3 - Current Calories: 1750 (Calorie goal not met)
    Flex Progress 4 - Current Calories: 2250 (Calorie goal met and exceeded - flex goal exceeded)

Reason:
- Users can implement discretion when going over set calorie limits.
- Users can set calorie limit higher to adjust MACROmate suggestions to their changing preferences. 
- Outside the scope of MVP.  

Future Considerations:
- A configurable tolerance range could allow MACROmate to recognize calorie goals as met without requiring users to meet an exact numerical value.  
- Configurable nutritional tolerances could reduce frustration with having to dial-in exact macros to meet rigid goals.
- A separate "Maximum Within Flex Allowance" calculation could provide additional quantity guidance based on nutritional tolerances, while preserving the current Maximum Within Targets calculation.  
- If MACROmate implements historical nutritional tracking and goal-completion evaluation, configurable tolerances for all user-set targets should be considered to provide consistent and meaningful assessments across all nutritional goals. 
- As a simpler alternative to user-configured tolerances, a future goal-status component could apply a predefined tolerance (e.g. ±5%) when evaluating if a user has met their configured goals. This tolerance would only apply exclusively to status messaging and would not modify or affect configured goals, current calculations, or planning guidance.      

Revisit:
- After MVP 1.0 release and gathering feedback from user testing 

Implementation Status:
- MACROmate currently uses fixed calorie and macronutrient targets.
- Users can plan meals that exceed their configured targets, with the application providing feedback on exceeded targets and remaining allowances.
- Maximum Within Targets calculates and displays allowable item quantities based on the fixed goals without an additional flexibility allowance.

Reasoning for Continued Deferral:
- MACROmate's current architecture gives users the freedom to exercise discretion when exceeding configured targets. 
- Flexible nutritional targets could provide more personalized feedback and nutritional guidance but would require additional user configuration and added calculation complexity.
- The interaction between supporting flexible nutritional tolerances, goal-completion feedback, and Maximum Within Targets requires further consideration.
- Initial user feedback should be evaluated to determine the usefulness of this feature.
- Future implementation of historical daily meal data could increase the value of flexible targets by allowing users to evaluate goal completion over time.   

Status:
Deferred - Post-MVP

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

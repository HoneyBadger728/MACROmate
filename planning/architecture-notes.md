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
- Portfolio firendly

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
- This decision is inline with the previous major decision that MACROmate be a meal planner foremost. Automatic reset options would push MACROmate closer to daily tracker territory and is outside the scope of MVP.

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

### Standarized Nutrition Units

Decision:
- Store nutritional values based on 100g of the item.

Reason: 
- Simplifies macro calculations, food comparisons, and remaining-allowance calculations.

Notes: 
- User-facing displays may still show ounces, servings, grams, or other units in the future. 

Status:
Approved

---

## UI Decisions

### Pantry Macro Display

Decision:
- The values stored in My Pantry will be based on the nutrition units specified above. Each pantry item will initialized to that value and updated instantly when the user enters a different quantity. 

Reason:
- Storing and rendering food items at the specified amount will keep calculations consistent and allow the user to preview realistic amounts of a given item with a set point of reference. 

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
- Duplicate meal entries should remain separate rather then being merged.

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

### Macro Goal Structure

Question:
- Should nutrition goals be stored as a single value or a range?

Examples:
    - Single Value: 
        Protein Goal: 200g

    - Range:
        Protein Goal
        - Min: 180g
        - Max: 220g

Current Thinking:
- Macros should be stored as a single value and not as a range.

Reasoning:
- Users will still be allowed to log items outside of their set goals. Single values give the user the same amount of agency and control. Ranges could become more useful if features are added outside the MVP scope.

Other Considerations:
- In addition to setting ranges, users could be given the option to set min targets and max targets.
    
    Example:
        Protein goal = 200g
        Carb goal < 200g
        Fat goal > 35g
            

Status: 
- Under consideration and deferred until Redux State planning. 

---

## Deferred Decisions

### Meal Catergories

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

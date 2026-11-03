

# MACROmate Development Roadmap

This roadmap documents MACROmate's development milestones, implemented functionality, and potential future enhancements. Priorities may change as development progresses and user feedback is gathered.

## 1. Core Functionality - Implemented

- Configure daily calorie and macronutrient goals.
- Add, edit, and delete Pantry foods.
- Add Pantry foods to Today's Meals.
- Edit meal quantities and remove individual meal entries.
- Clear Today's Meals without affecting Pantry items or configured goals.
- Calculate daily nutritional totals and remaining targets.
- Calculate Maximum Within Targets for individual Pantry foods.
- Identify nutritional Limiting Factors.
- Display nutritional progress and running totals.
- Persist application data using localStorage.
- Implement safeguards for editing and deleting referenced Pantry foods.

## 2. MVP 1.0 - Implemented

### External Food API Integration

- Integrated USDA FoodData Central as an external nutritional data source.
- Implemented food search and nutritional data import into My Pantry.
- Added handling for loading states, API errors, and incomplete nutritional data.
- Implemented a Vite development proxy for local API requests.
- Implemented a Netlify Function for production API requests.
- Secured the USDA API key using environment variables.

External API integration fulfills a requirement of the Codecademy portfolio project.

### Responsive Design and UI Refinement

- Implemented mobile-first, responsive layouts.
- Adapted the interface for tablet and desktop screens.
- Refined primary navigation, forms, modals, and interactive controls.
- Implemented persistent bottom navigation.
- Implemented MacroProgressDock to display nutritional totals and remaining allowances across primary application pages.
- Established consistent visual styling using shared CSS variables.

### Testing and Release Preparation

- Tested core meal-planning workflows and nutritional calculation edge cases.
- Reviewed keyboard navigation, accessibility considerations, input validation, and user feedback.
- Verified application state persistence across browser refreshes.
- Verified application routing and direct-route refresh behavior in production.
- Verified USDA FoodData Central integration in local and production environments.
- Verified production build.
- Deployed the application to Netlify.
- Completed project README and supporting planning documentation.

### MVP 1.0 Release

- [x] Core functionality implemented.
- [x] External API integration completed.
- [x] Responsive UI implemented.
- [x] Core workflows and production behavior tested.
- [x] Production deployment completed.
- [x] README documentation completed.
- [x] Final documentation commit and production verification.
- [x] Create Git release tag `v1.0.0`.

**Status:** MVP 1.0 - Released.

## 3. Post-MVP Enhancements 

### Meal Planning Suggestions

- Suggest food combinations using available Pantry items and remaining macro targets.
- Recommend food quantities in grams.
- Prioritize matching protein, carbohydrate, and fat targets.
- Indicate whether suggested food combinations fit within the remaining calorie target or exceed it.

---

### Additional Features to Evaluate

- Macro-priority filtering for food recommendations.
- Range-based macro goals.
- Expanded meal planning guidance.

These features are potential enhancements and not commitments for MVP 1.0.

---
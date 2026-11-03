
# MACROmate

**Plan what you can eat, not just what you've eaten.**

MACROmate is a mobile-first meal-planning and macronutrient-tracking application built with React and Redux Toolkit.

Rather than focusing exclusively on recording food consumption, MACROmate helps users determine **what they can still eat-and how much-based on their remaining daily nutritional targets**.

**[Try MACROmate Live](https://getmacromate.netlify.app)**

## Project Motivation

Traditional nutrition-tracking applications are useful for recording food consumption, but planning meals around specific calorie and macronutrient targets can require repeated calculations and adjustments.

MACROmate was developed around a distinction between tracking nutritional intake and planning it. While traditional food trackers provide a record of what has been consumed, MACROmate prioritizes helping users determine what they can still eat based on their remaining nutritional targets.

Instead of asking, *"What have I already eaten today?"*, MACROmate helps users answer:

**"Given my individual nutritional goals and current meal plan, what can I still eat?"**

The application uses a pantry-centered workflow to evaluate available foods against remaining nutritional targets, providing immediate feedback to help users plan their meals.

## Key Features

### Daily Nutritional Goals

- Configure individual calorie, protein, carbohydrate, and fat targets.
- Actively monitor planned nutritional totals, remaining allowances, and progress toward each goal.
- View running totals across the application through the persistent MacroProgressDock.

### My Pantry

- Create, edit, and save frequently used foods.
- Search USDA FoodData Central and import nutritional information.
- Preview calories and macronutrients for user-specified food quantities.
- Calculate **Maximum Within Targets** for each food based on remaining nutritional allowances.
- Identify the nutritional constraints, or **Limiting Factors**, that determine the maximum quantity.
- Receive warnings before modifying foods referenced by existing meal entries.

### Today's Meals

- Add foods from the pantry in user-specified quantities.
- Edit quantities or remove individual meal entries.
- View updated nutritional totals and remaining allowances after changes.
- Clear the current meal plan without deleting saved pantry foods or nutritional goals.

### User Interface and Accessibility

- Responsive, mobile-first interface.
- Persistent navigation and macro progress display.
- Keyboard-accessible controls and confirmation dialogs.
- Input validation and feedback for user actions.
- Browser-local persistence of nutritional goals, pantry items, and meal entries.
- Full application reset with confirmation.

## Core Planning Functionality

### Maximum Within Targets

MACROmate evaluates each pantry food against the user's remaining calorie, protein, carbohydrate, and fat allowances.

For each applicable nutritional constraint, the application calculates the quantity of food that would fit within the remaining allowance. The smallest valid quantity determines the food's **Maximum Within Targets**.

The application also identifies the nutritional constraint or constraints responsible for that limit.

For example, a food might fit within the remaining calorie allowance but exceed the remaining fat allowance. In that case, fat becomes the limiting factor.

The calculation accounts for foods containing zero values for particular macronutrients, targets that have already been met or exceeded, and foods with multiple limiting factors.

MACROmate is intended to provide users with accurate nutritional guidance without unnecessarily restricting their decisions. Although the application calculates the maximum quantity of a food that fits within remaining targets, users can still choose to exceed those targets and evaluate the resulting changes to their meal plan.

### Planner First, Tracker Second

MACROmate prioritizes meal planning over traditional food logging.

Meal entries represent a working nutritional plan rather than a permanent consumption history. Users can experiment with quantities, adjust planned meals, and manually clear the current plan when ready to begin another planning session.

This approach preserves user flexibility while providing the nutritional information necessary to make informed planning decisions.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Redux Toolkit | Shared application state management |
| React Router | Client-side routing |
| Vite | Development tooling and production builds |
| CSS | Responsive layouts and component styling |
| USDA FoodData Central API | External nutritional data |
| Netlify Functions | Server-side proxy for USDA API requests |
| Browser localStorage | Client-side data persistence |
| Git and GitHub | Version control and source hosting |
| Netlify | Production hosting and continuous deployment |

## Architecture and Design Decisions

### Pantry-Centered Data Model

Foods are stored in a reusable pantry, with nutritional values standardized per 100 grams.

Meal entries reference their corresponding pantry foods and store their own quantities in grams, rather than duplicating nutritional information.

This establishes a single source of truth for each food's nutritional values, reduces redundant data, and allows multiple meal entries to reference the same food while maintaining independent quantities.

Changes to a pantry item's nutritional information are reflected in any meal entries referencing that food. The application requires user acknowledgment before modifying referenced foods and prevents their deletion while they are in use.

### Derived Nutritional Data

Meal totals, remaining targets, progress indicators, and pantry quantity guidance are calculated from the current Redux state rather than stored independently.

Using derived values reduces redundant state and helps maintain consistency when users modify their meal plans.

### Shared and Local State

Redux Toolkit manages shared application data, including nutritional goals, pantry foods, and meal entries.

Component-specific interaction state, such as editing controls and modal visibility, remains local to React components.

This separation limits unnecessary global state while keeping application-wide nutritional data centrally managed.

### Persistent Planning Data

MACROmate uses browser localStorage to preserve nutritional goals, pantry items, and meal entries between sessions.

The application initializes its Redux store from saved data when available and uses default state when saved data cannot be retrieved or parsed.

### Serverless USDA Integration

Food searches are handled through a Netlify Function that communicates with the USDA FoodData Central API.

The USDA API key is stored as a server-side environment variable rather than embedded in the client application.

During local development, Vite provides an API proxy. In production, Netlify redirects API requests to the serverless function.

### Mobile-First Application Design

MACROmate was designed primarily for situations in which users are preparing meals, weighing food, or making nutritional decisions away from a desktop computer.

The interface uses persistent bottom navigation and a shared MacroProgressDock to keep essential nutritional information accessible throughout the application.

Responsive layouts adapt the same core workflow to larger screens without changing the underlying application structure.

## Challenges and Lessons Learned

### Designing Reliable Nutritional Calculations

One of the primary challenges in developing MACROmate was implementing the Maximum Within Targets calculation, which evaluates food quantities against multiple nutritional constraints simultaneously.

The calculation needed to account for foods containing zero values for certain macronutrients, targets that had already been met or exceeded, and situations where multiple nutritional constraints produced the same limiting quantity.

Addressing these edge cases reinforced the importance of separating calculation logic from presentation components and deriving nutritional guidance from a consistent source of application state.

### Managing Relationships Between Shared Data

MACROmate's pantry-centered architecture introduced an important data-modeling consideration: meal entries needed to reference reusable pantry foods without duplicating their nutritional information.

This approach established a single source of truth for each food's nutritional values but also introduced dependencies between pantry items and existing meal entries. Editing a pantry item's nutritional information could affect current meal totals, while deleting a referenced food could leave meal entries without valid nutritional data.

Implementing confirmation dialogs and deletion safeguards reinforced the importance of considering how changes to shared data affect other parts of an application.

### Integrating an External API for Production

Integrating USDA FoodData Central required different approaches for local development and production deployment.

A Vite development proxy supported local API requests, while a Netlify Function provided a server-side integration for the deployed application. This allowed the USDA API key to remain outside the client-side bundle while maintaining a consistent request path across environments.

The process provided practical experience with environment variables, serverless functions, API error handling, and the differences between development and production environments.

## Getting Started

### Prerequisites

- Node.js and npm
- A USDA FoodData Central API key

### Installation

Clone the repository:

```bash
git clone https://github.com/HoneyBadger728/MACROmate.git
cd MACROmate
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add your USDA API key:

```env
USDA_API_KEY=your_usda_api_key
```

### Local Development

To run the application with the Netlify Functions integration:

```bash
npx netlify dev
```

Netlify Dev starts the frontend development server and handles requests to the local serverless USDA integration.

To run the Vite development server independently:

```bash
npm run dev
```

The standalone Vite server uses the development proxy configured in `vite.config.js` for USDA API requests.

### Production Build

Generate the production build:

```bash
npm run build
```

The generated files are placed in the `dist/` directory.

## Current Limitations

MACROmate MVP 1.0 intentionally focuses on individual, short-term meal planning.

- Application data is stored locally in the browser and does not synchronize between devices.
- User accounts and cloud-based nutritional histories are not supported.
- Meal plans are cleared manually rather than automatically resetting each day.
- Nutritional quantities are entered in grams.
- Meal categories, reusable multi-ingredient recipes, and automatic meal suggestions are not included in MVP 1.0.

## Future Development

Potential enhancements include:

- Pantry-based meal combination suggestions using remaining nutritional targets.
- Meal categories and grouping.
- Additional serving-unit options.
- Flexible nutritional targets and ranges.
- Expanded planning guidance and macro-priority filtering.
- Progressive Web App support.

These features are under consideration and are not part of the initial MVP 1.0 release.

## Project Documentation

MACROmate's development planning, architectural decisions, and feature requirements are documented in the [`planning/`](planning/) directory.

- [Product Brief](planning/product-brief.md) - Project objectives, target users, and MVP requirements.
- [Architecture Notes](planning/architecture-notes.md) - Architectural decisions, design rationale, and implementation considerations.
- [Component Architecture](planning/component-architecture.md) - Original and implemented React component hierarchies.
- [Redux State Planning](planning/redux-state-planning.md) - State structure, derived calculations, and data management decisions.
- [User Stories](planning/user-stories.md) - Functional requirements expressed from the user's perspective.
- [Development Roadmap](planning/roadmap.md) - Development milestones and potential post-MVP enhancements.

## Project Status

**MVP 1.0 - Deployed and undergoing final release preparation.**

MACROmate was developed as a Codecademy full-stack portfolio capstone project, emphasizing React development, centralized state management, nutritional calculations, accessible interface design, and external API integration.

**[Launch MACROmate](https://getmacromate.netlify.app)**

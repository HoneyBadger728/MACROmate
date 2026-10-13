# Component Architecture 

## Original Component Architecture Plan

```text
App
│
├── Routes
│   ├── GoalsPage
│   │   ├── GoalsForm
│   │   └── GoalsSummary
│   │
│   ├── PantryPage
│   │   ├── AddFoodButton
│   │   ├── AddFoodModal
│   │   └── PantryList
│   │       └── PantryItemCard
│   │           └── DeleteConfirmationModal
│   │
│   └── MealEntriesPage
│       └── MealEntriesList
│           └── MealEntryCard
│
└── Navigation
```

The original component plan has been preserved as a point of reference. The implemented architecture reflects the current React component hierarchy; the rationale for architectural changes is documented in architecture-notes.md


## Implemented Component Architecture

```text
App
│
├── Routes
│   ├── GoalsPage (/)
│   │   ├── GoalsForm
│   │   ├── MacroProgress
│   │   └── UserActions
│   │
│   ├── PantryPage (/pantry)
│   │   ├── AddFoodModal (conditional)
│   │   │   └── Modal
│   │   │
│   │   └── PantryList
│   │       └── PantryItemCard (repeated)
│   │           ├── DeleteConfirmationModal (conditional)
│   │           │   └── Modal
│   │           │
│   │           └── EditNutritionWarningModal (conditional)
│   │               └── Modal
│   │
│   └── MealEntriesPage (/meals)
│       └── MealEntriesList
│           └── MealEntryCard (repeated)
│
├── MacroProgressDock
└── Navigation
```
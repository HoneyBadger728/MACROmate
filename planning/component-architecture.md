# Component Architecture

App
|
|-- Header
|   | - Navigation
|
|-- Routes
    |-- GoalsPage
    |   |- GoalsForm
    |   |- GoalsSummary
    |
    |-- PantryPage
    |   |- AddFoodButton
    |   |- AddFoodModal
    |   |- PantryList
    |   |   |- PantryItemCard
        |       |- DeleteConfirmationModal
    |   |- MacroProgressFooter
    |
    |-- MealEntriesPage
    |   |- MealEntriesList
    |   |- MealEntryCard
    |   |- MacroProgressFooter


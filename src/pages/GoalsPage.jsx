import GoalsForm from "../features/goals/GoalsForm";
import MacroProgressFooter from "../components/MacroProgressFooter";

function GoalsPage() {
    return (
        <main>  
            <h2>Goals</h2>
            <GoalsForm />
            <MacroProgressFooter />
        </main>
    );
}

export default GoalsPage;
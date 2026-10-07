import GoalsForm from "../features/goals/GoalsForm";
import MacroProgress from "../features/goals/MacroProgress";
import "./GoalsPage.css"

function GoalsPage() {
    return (
        <section className="home-page">  
            <h1 className="home-page__title">MACROmate</h1>

            <GoalsForm />
            <MacroProgress />
        </section>
    );
}

export default GoalsPage;
import GoalsForm from "../features/goals/GoalsForm";
import MacroProgress from "../features/goals/MacroProgress";
import UserActions from "../features/goals/UserActions";
import "./GoalsPage.css"

function GoalsPage() {
    return (
        <section className="home-page">  
            <h1 className="home-page__title">MACROmate</h1>

            <div className="home-page__content">
                <GoalsForm />
                <MacroProgress />
                <UserActions />
            </div>
        </section>
    );
}

export default GoalsPage;
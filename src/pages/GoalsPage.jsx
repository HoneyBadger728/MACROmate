import GoalsForm from "../features/goals/GoalsForm";
import MacroProgress from "../features/goals/MacroProgress";
import UserActions from "../features/goals/UserActions";
import MacroLogo from "../components/MacroLogo";
import "./GoalsPage.css"

function GoalsPage() {
    return (
        <section className="home-page">  
            <h1 className="home-page__title" aria-label="MACROmate">
                <MacroLogo size={36} className="home-page__logo"/>
                <span>
                    ACRO<span className="home-page__brand-mate">mate</span>
                </span>
            </h1>

            <div className="home-page__content">
                <GoalsForm />
                <MacroProgress />
                <UserActions />
            </div>
        </section>
    );
}

export default GoalsPage;
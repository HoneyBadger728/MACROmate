import GoalsForm from "../features/goals/GoalsForm";
import MacroProgress from "../features/goals/MacroProgress";
import UserActions from "../features/goals/UserActions";
import MacroLogo from "../components/MacroLogo";
import "./GoalsPage.css"

function GoalsPage() {
    return (
        <section className="home-page">
            <header className="home-page__header">    
                <h1 className="home-page__title" aria-label="MACROmate">
                    <MacroLogo size={36} className="home-page__logo"/>
                    <span>
                        ACRO<span className="home-page__brand-mate">mate</span>
                    </span>
                </h1>

                <p className="home-page__tagline">
                    Plan <span aria-hidden="true">·</span> Eat <span aria-hidden="true">·</span> Balance <span aria-hidden="true">·</span> Repeat
                </p>
            </header>  
            <div className="home-page__content">
                <GoalsForm />
                <MacroProgress />
                <UserActions />
            </div>
        </section>
    );
}

export default GoalsPage;
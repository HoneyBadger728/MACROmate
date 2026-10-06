import GoalsForm from "../features/goals/GoalsForm";

function GoalsPage() {
    return (
        <section className="home-page">  
            <h1 className="home-page__title">MACROmate</h1>

            <GoalsForm />
        </section>
    );
}

export default GoalsPage;
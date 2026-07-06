import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <NavLink to="/pantry">My Pantry</NavLink>
            <NavLink to="/" end>MACROmate</NavLink>
            <NavLink to="/meals">Today's Meals</NavLink>
        </nav>
    );
}

export default Navigation;
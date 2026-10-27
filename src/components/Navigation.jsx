import { NavLink } from "react-router-dom";
import MacroLogo from "./MacroLogo";
import "./Navigation.css"

function Navigation() {
    return (
        <nav className="bottom-nav" aria-label="Primary navigation">
            <NavLink 
                className="bottom-nav__link bottom-nav__link--pantry"  
                to="/pantry"
            >
                My Pantry
            </NavLink>
            
            <NavLink 
                className="bottom-nav__link bottom-nav__link--home" 
                to="/" 
                end
                aria-label="MACROmate Home"
            >
                <MacroLogo size={32} />
            </NavLink>
            
            <NavLink 
                className="bottom-nav__link bottom-nav__link--meals" 
                to="/meals"
            >
                Today's Meals
            </NavLink>
        </nav>
    );
}

export default Navigation;
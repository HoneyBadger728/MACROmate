import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import MacroProgressDock from './components/MacroProgressDock';
import GoalsPage from './pages/GoalsPage';
import PantryPage from './pages/PantryPage';
import MealEntriesPage from './pages/MealEntriesPage';
import './App.css';

function App() {
  return (
    <div className='app-shell'>
      <main className='app-content'>
        <Routes>
          <Route path="/" element={<GoalsPage />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/meals" element={<MealEntriesPage />} />
        </Routes>
      </main>

      <MacroProgressDock />
      <Navigation />
      
    </div>
  );
}

export default App;
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import GoalsPage from './pages/GoalsPage';
import PantryPage from './pages/PantryPage';
import MealEntriesPage from './pages/MealEntriesPage';
import './App.css';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<GoalsPage />} />
        <Route path="/pantry" element={<PantryPage />} />
        <Route path="/meals" element={<MealEntriesPage />} />
      </Routes>
    </>
  );
}

export default App;
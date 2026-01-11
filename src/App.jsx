import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { ChoreBoard } from './pages/ChoreBoard';
import { Calendar } from './pages/Calendar';
import { ShoppingList } from './pages/ShoppingList';
import { MealPlanner } from './pages/MealPlanner';
import { Profile } from './pages/Profile';
import { Emergency } from './pages/Emergency';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/updates" element={<div>Updates Page (Placeholder)</div>} />
      <Route path="/chores" element={<ChoreBoard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/shopping" element={<ShoppingList />} />
      <Route path="/meals" element={<MealPlanner />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/emergency" element={<Emergency />} />
    </Routes>
  );
}

export default App;

import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1 fw-bold">🐙 OctoFit Tracker</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/activities">
              📊 Activities
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/leaderboard">
              🏆 Leaderboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/teams">
              👥 Teams
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/users">
              👤 Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/workouts">
              💪 Workouts
            </NavLink>
          </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <h1 className="mb-4 text-center fw-bold display-4">OctoFit Tracker Dashboard</h1>

        <main>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
        </main>
      </div>

      <footer className="bg-dark text-light text-center py-4 mt-5">
        <div className="container">
          <p className="mb-0">&copy; 2026 OctoFit Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

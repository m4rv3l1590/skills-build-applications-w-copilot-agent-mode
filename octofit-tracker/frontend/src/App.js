import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg octofit-navbar shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/users">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="OctoFit"
              className="octofit-logo"
            />
            <span>OctoFit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-navbar"
            aria-controls="octofit-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofit-navbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Usuarios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">
                  Actividades
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">
                  Equipos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body py-4">
            <h1 className="display-6 fw-semibold mb-2 app-title">Panel de OctoFit Tracker</h1>
            <p className="app-subtitle mb-0">
              Navega por los módulos y consulta los datos del backend Django REST en tablas
              consistentes.
            </p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

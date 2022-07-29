import './App.scss';
import {
  Routes, Route, NavLink, Navigate,
} from 'react-router-dom';
import PeoplePage from './components/PeoplePage/PeoplePage';

const App:React.FC = () => {
  return (
    <div className="App subtitle is-3">
      <nav className="nav">
        <NavLink
          className={({ isActive }) => (isActive
            ? 'button is-link' : 'button is-info')}
          to="/"
        >
          Home page
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive
            ? 'button is-link' : 'button is-info')}
          to="/people"
        >
          People page
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/people" element={<PeoplePage />} />

        <Route
          path="*"
          element={
            <p>Page not found</p>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

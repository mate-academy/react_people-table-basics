import {
  Route, Routes, NavLink, Navigate,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="Header">
        <h1 className="Header__title">People table:</h1>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive
            ? 'active-link' : 'Header__link')}
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) => (isActive
            ? 'active-link' : 'Header__link')}
        >
          People page
        </NavLink>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;

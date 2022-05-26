import { FC } from 'react';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import 'bulma';

const App: FC = () => {
  return (
    <div className="App">
      <nav className="navbar is-spaced">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Home
          </Link>

          <Link to="/people" className="navbar-item">
            People
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;

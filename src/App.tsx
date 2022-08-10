import './App.scss';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div className="box">
    <div className="App">
      <h1 className="title">People table</h1>
    </div>

    <nav className="nav">
      <NavLink to="/">
        <p className="nav__link">Home page</p>
      </NavLink>

      <NavLink to="people">
        <p className="nav__link">People page</p>
      </NavLink>
    </nav>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

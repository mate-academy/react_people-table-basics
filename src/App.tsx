import './App.scss';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => (
  <div className="container box">
    <div className="App">
      <h1 className="title is-2">People table</h1>
    </div>

    <nav className="nav">
      <NavLink to="/">
        <p className="link">Home page</p>
      </NavLink>

      <NavLink to="people">
        <p className="link">People page</p>
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

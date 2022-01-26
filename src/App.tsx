import {
  Routes, Route, NavLink, Navigate,
} from 'react-router-dom';

import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <div className="container">
      <header className="Header">
        <nav className="navbar block has-shadow">
          <ul className="navbar-menu">
            <li>
              <NavLink to="/" className="navbar-item">Home</NavLink>
            </li>
            <li>
              <NavLink to="/people" className="navbar-item">People</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </div>
);

export default App;

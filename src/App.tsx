import './App.scss';

import {
  NavLink,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <h1 className="title">People table</h1>
    <div className="block">
      <NavLink
        to="/"
        className={isActive => `button is-primary ${isActive ? 'activeLink' : undefined}`}
      >
        Home
      </NavLink>
      {' '}
      <NavLink
        to="/people"
        className={isActive => `button is-primary ${isActive ? 'activeLink' : undefined}`}
      >
        People
      </NavLink>
    </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />

      <Route path="/people" element={<PeoplePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;

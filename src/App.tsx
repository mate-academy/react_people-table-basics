import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import cn from 'classnames';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

import 'bulma';

const App = () => (
  <div className="App">
    <div className="navbar">
      <div className="navbar-brand">
        <NavLink
          className={({ isActive }) => (
            cn(
              'navbar-item',
              'is-tab',
              { 'is-active': isActive },
            )
          )}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => (
            cn(
              'navbar-item',
              'is-tab',
              { 'is-active': isActive },
            )
          )}
          to="/people"
        >
          People Page
        </NavLink>
      </div>
    </div>

    <Routes>
      <Route
        path="/"
        element={
          <HomePage />
        }
      />
      <Route
        path="/home"
        element={
          <Navigate to="/" />
        }
      />
      <Route
        path="/people"
        element={
          <PeoplePage />
        }
      />
    </Routes>
  </div>
);

export default App;

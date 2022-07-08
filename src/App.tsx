import {
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import './App.scss';
import 'bulma';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink
          className="navbar-item"
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className="navbar-item"
          to="/people"
        >
          People Page
        </NavLink>
      </div>
    </nav>

    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/home"
        element={<Navigate to="/" />}
      />
      <Route
        path="/people"
        element={<PeoplePage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </div>
);

export default App;

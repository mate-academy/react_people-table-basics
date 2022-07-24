import './App.scss';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import 'bulma';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <nav>
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
          People page
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

import './App.scss';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import PeoplePage from './components/PeoplePage';

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (
              isActive ? 'active nav__item' : 'nav__item'
            )}
          >
            Home page
          </NavLink>

          <NavLink
            to="/people"
            className="nav__item"
          >
            Peope page
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={<h1 className="title">Home Page</h1>}
        />

        <Route
          path="people"
          element={<PeoplePage />}
        />

        <Route
          path=""
          element={<h1 className="title">Page not found</h1>}
        />

        <Route
          path="/home"
          element={<Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;

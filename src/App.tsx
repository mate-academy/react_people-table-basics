import './App.scss';
import {
  Routes, Route, NavLink, Navigate,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { NotFound } from './components/NotFound';

const App = () => {
  return (
    <div className="App">
      <div className="tabs is-centered">
        <ul>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => {
                return {
                  color: isActive ? 'blue' : '',
                };
              }}
            >
              Home Page

            </NavLink>
          </li>
          <li>
            <NavLink
              to="/PeoplePage"
              style={({ isActive }) => {
                return {
                  color: isActive ? 'blue' : '',
                };
              }}
            >
              People Page

            </NavLink>
          </li>
        </ul>
      </div>

      <Routes>
        <Route
          path="*"
          element={<NotFound />}
        />
        <Route
          path="/"
          element={<p className="title">Home Page</p>}
        />

        <Route
          path="/home"
          element={<Navigate to="/" />}
        />
        <Route
          path="/PeoplePage"
          element={
            <PeoplePage />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

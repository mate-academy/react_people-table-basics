import './App.scss';
import {
  Routes, Route, NavLink, Navigate,
} from 'react-router-dom';
import classNames from 'classnames';
import { PeoplePage } from './components/PeoplePage';
import { NotFound } from './components/NotFound';

const App = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'is-info' : 'is-light';
  };

  return (
    <div className="App">
      <div className="tabs is-centered">
        <ul>
          <li>
            <NavLink
              to="/"
              className={(param) => classNames('button', getLinkClass(param))}
            >
              Home Page

            </NavLink>
          </li>
          <li>
            <NavLink
              to="/PeoplePage"
              className={(param) => classNames('button', getLinkClass(param))}
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
          element={<Navigate to="/" replace />}
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

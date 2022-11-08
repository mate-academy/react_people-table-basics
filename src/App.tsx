
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { People } from './components/People';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import classNames from "classnames";

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={({isActive}) => classNames("navbar-item", {
           'has-background-grey-lighter': isActive
            })}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({isActive}) => classNames("navbar-item", {
              'has-background-grey-lighter': isActive
               })}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
    <Routes>
      <Route
        path='/'
        element={(<HomePage />)}
      />
      <Route
        path='home'
        element={<Navigate to='/' replace />}
      />
      <Route path='people'>
      <Route
        index
        element={(<People />)}
      />
      <Route
        path=':slug'
        element={(<People />)}
      />
      </Route>
      <Route
        path='*'
        element={(<NotFoundPage />)}
      />
    </Routes>
  </div>
);

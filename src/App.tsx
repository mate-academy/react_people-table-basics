import cn from 'classnames';

import './App.scss';
import { NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

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
            to="/"
            className={({ isActive }) => cn('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => cn('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/people'>
            <Route path=':userFromId?' element={<PeoplePage />}/>
          </Route>
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>

      </div>
    </main>
  </div>
);

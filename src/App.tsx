import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

// import { Loader } from './components/Loader';

import './App.scss';
// import { PeopleTable } from './components/PeopleTable';

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
            to="/people"
            className={({ isActive }) => cn('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Outlet />
        {/* <h1 className="title">Home Page</h1>
        <h1 className="title">People Page</h1> */}

        {/* <div className="block">
          <div className="box table-container">
            <Loader />

            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>

            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>

            <PeopleTable />
          </div>
        </div> */}
      </div>
    </main>
  </div>
);

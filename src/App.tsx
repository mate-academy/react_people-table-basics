import {
  // NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
// import classNames from 'classnames';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => {
  // const activeLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  //   'navbar-item',
  //   { 'has-background-grey-lighter': isActive },
  // );

  return (
    <div data-cy="app">
      <Navigation />
      {/* <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={activeLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={activeLinkClass}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav> */}
      <main className="section">
        <div className="container">
          {/* <h1 className="title">Home Page</h1> */}
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/people">
              <Route path=":personSlug?" element={<PeoplePage />} />
            </Route>

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/people">
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>

        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes> */}
    </div>
  );
};

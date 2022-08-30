// eslint-disable-next-line object-curly-newline
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFound/NotFound';
// eslint-disable-next-line max-len
import { CustomPersonPage } from './components/CustomPersonPage/CustomPersonPage';

export const App = () => {
  return (
    <>
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
              className={({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': !isActive },
              )}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': !isActive },
              )}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
      <div data-cy="app">
        <main className="section">
          <div className="container">
            <div className="block">
              <div className="box table-container">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="people">
                    <Route index element={<PeoplePage />} />
                    <Route path=":id" element={<PeoplePage />} />
                    <Route
                      path="personalPage/:slug"
                      element={<CustomPersonPage />}
                    />
                  </Route>
                  <Route path="/home" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

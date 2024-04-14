import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const activeNavLink = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" className={activeNavLink}>
              Home
            </NavLink>

            <NavLink to="/people" className={activeNavLink}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            ></Route>
            <Route
              path="home"
              element={<Navigate to="/" replace={true} />}
            ></Route>
            <Route path="people">
              <Route index element={<PeoplePage />}></Route>
              <Route path=":slug" element={<PeoplePage />}></Route>
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            ></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

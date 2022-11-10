import classNames from 'classnames';
import { FC } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { People } from './pages/People';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item',
        {
          'has-background-grey-lighter': isActive,
        },
      )}
    >
      {text}
    </NavLink>
  );
};

export const App: FC = () => {
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
            <PageNavLink
              to="../"
              text="Home"
            />
            <PageNavLink
              to="../people"
              text="People"
            />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<People />} />
              <Route path=":selectedSlug" element={<People />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

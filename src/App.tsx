import './App.scss';
import {
  Navigate, NavLink, Route, Routes,
} from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { People } from './pages/People';
import { Home } from './pages/Home';

type Props = {
  path: string;
  text: string;
  className: string;
};

const PageNavLink: FC<Props> = ({
  path,
  text,
  className,
}) => (
  <NavLink
    to={path}
    className={({ isActive }) => classNames(className, {
      'has-background-grey-lighter': isActive,
    })}
  >
    {text}
  </NavLink>
);

export const App = () => {
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
            <PageNavLink path="/" text="Home" className="navbar-item" />
            <PageNavLink path="/people" text="People" className="navbar-item" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/people">
              <Route index element={<People />} />
              <Route path=":slug" element={<People />} />
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

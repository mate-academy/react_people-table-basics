import classNames from 'classnames';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import { People } from './components/People';

export const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');

    return () => {
      document.documentElement.classList.remove('has-navbar-fixed-top');
    };
  }, []);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
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
            <NavLink to="/" end className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/people" className={getLinkClass}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/people">
              <Route path=":peopleSlug?" element={<People />}></Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

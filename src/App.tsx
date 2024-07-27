import './App.scss';
import classNames from 'classnames';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import People from './components/People/People';
import NoPeople from './components/NoPeople/NoPeople';

export const App = () => {
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
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={getLinkClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<People />} />
              <Route path=":slug" element={<People />} />
            </Route>
            <Route path="*" element={<NoPeople />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

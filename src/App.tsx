import './App.scss';
import classNames from 'classnames';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { People } from './components/People/People';
export const App = () => {
  const isNavActive = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

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
            <NavLink to="/" className={isNavActive}>
              Home
            </NavLink>
            <NavLink to="/people" className={isNavActive}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate replace={true} to="/" />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="people">
              <Route index element={<People />} />
              <Route path=":slugPerson" element={<People />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

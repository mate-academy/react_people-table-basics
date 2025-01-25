import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { getLinkActiveClass } from './utiles/getLinkActiveClass';
import { Home } from './components/Home/Home';
import { Error } from './components/Error/Error';
import { People } from './components/People/People';
import { useEffect } from 'react';
import './App.scss';

export const App = () => {


  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');

    return () => {
      document.documentElement.classList.remove('has-navbar-fixed-top');
    };
  }, []);



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
            <NavLink to="/" end className={getLinkActiveClass}>Home</NavLink>
            <NavLink to="/people" className={getLinkActiveClass}>People</NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />}>
              <Route path=":slug" element={<People/>} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </main>
    </div>
  )
};

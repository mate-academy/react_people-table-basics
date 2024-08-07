import './App.scss';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { PeoplePage } from './components/People/PeopleList';
import { useEffect } from 'react';
import { Home } from './components/Home/Home';
import { NotFound } from './components/NotFound/NotFound';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {
      return navigate('/');
    }
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
          <div className="navbar-brand">{<NavBar />}</div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/people/:id?" element={<PeoplePage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

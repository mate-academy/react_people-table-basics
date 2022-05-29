import './App.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from './Components/Navigation';

const App: React.FC = () => (
  <header className="header">
    <nav className="nav">
      <NavLink to="/" className="nav__link">
        Home
      </NavLink>
      <NavLink to="/people" className="nav__link">
        People
      </NavLink>
    </nav>
    <Nav />
  </header>
);

export default App;

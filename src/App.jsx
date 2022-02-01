import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bulma';

import './App.scss';

const App = () => (
  <div className="App">
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <Link className="navbar-item" to="/">Home</Link>
      <Link className="navbar-item" to="/people">People</Link>
    </nav>
    <Outlet />
  </div>
);

export default App;

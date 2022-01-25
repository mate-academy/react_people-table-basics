import { Routes, Route, NavLink } from 'react-router-dom';

import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './App.scss';

const App = () => (
  <div className="App">
    <header className="Header block">
      <nav className="navbar has-shadow">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/people">People</NavLink>
          </li>
        </ul>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
    </Routes>
  </div>
);

export default App;

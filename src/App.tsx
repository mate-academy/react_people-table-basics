import React from 'react';
import {
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <header className="header">
      <nav className="header__nav nav">
        <Link to="/" className="nav__link">
          Home
        </Link>
        <Link to="/people" className="nav__link">
          People
        </Link>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route
        path="*"
        element={(
          <h1>404! Page Not Found!</h1>
        )}
      />
      <Route path="/home" element={<Navigate to="/" />} />
    </Routes>
  </div>
);

export default App;

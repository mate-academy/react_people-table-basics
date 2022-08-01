import './App.scss';
import {
  Routes, Route, Navigate, Link,
} from 'react-router-dom';
import React from 'react';
import { PeoplePage } from './PeoplePage';

export const Home: React.FC = () => (
  <div className="Home People">
    <h2>Home page</h2>
  </div>
);

export const NotFoundPage: React.FC = () => (
  <div className="NotFoundPage People">
    <h2>Page not found</h2>
  </div>
);

export const App = () => (
  <>
    <header className="Header">
      <nav className="Nav">
        <Link to="/home" className="Nav Nav__link">Home</Link>
        &nbsp;
        <Link to="/people" className="Nav Nav__link">People</Link>
        &nbsp;
      </nav>
    </header>

    <div className="App">
      {/* <h1>People table</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/home"
          element={<Navigate to="/" />}
        />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </>

);

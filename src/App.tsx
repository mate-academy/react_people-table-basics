import React from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <nav className="nav">
      <Link className="nav__link" to="/">
        Home page
      </Link>
      <Link className="nav__link" to="/people">
        People page
      </Link>
    </nav>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route
        path="*"
        element={(
          <h2 style={{ textAlign: 'center' }}>Page not found</h2>
        )}
      />
    </Routes>
  </div>
);

export default App;

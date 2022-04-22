import React from 'react';
import './App.scss';
import {
  Link,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { PeoplePage } from './PeoplePage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';
import { Header } from './Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="title">People table</h1>
      <Header>
        <nav>
          <ul className="nav-bar">
            <li>
              <Link
                to="/"
                className="nav-bar__link"
                title="Visit Home Page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/people"
                className="nav-bar__link"
                title="Visit People Table"
              >
                People
              </Link>
            </li>
          </ul>
        </nav>
      </Header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />

        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);

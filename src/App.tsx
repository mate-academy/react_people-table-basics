import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';
import PeoplePage from './pages/PeoplePage';
import Header from './components/Header';

export const App = () => (
  <div data-cy="app">
    <Header />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people/" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </main>
  </div>
);

import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navigation } from './components/Navigation/Navigation';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);

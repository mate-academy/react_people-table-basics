import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { Navigation } from './components/Navigation';
import { PeoplesPage } from './components/PeoplesPage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/people">
            <Route index element={<PeoplesPage />} />
            <Route path=":paramSlug" element={<PeoplesPage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);

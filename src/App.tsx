import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, NotFoundPage, PeoplePage } from './pages';
import { Navigation } from './components/Navigation';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to=".." replace />} />
          <Route path="people">
            <Route path=":currentSlug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

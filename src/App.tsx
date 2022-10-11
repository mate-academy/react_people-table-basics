import { Navigate, Route, Routes } from 'react-router-dom';

import { Navigation } from './components/Navigation';

import { HomePage } from './pages/Home';
import { NotFoundPage } from './pages/NotFound';
import { PeoplePage } from './pages/People';

import './App.scss';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navigation />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

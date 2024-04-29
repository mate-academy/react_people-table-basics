import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import './App.scss';
import { Navbar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'home'} element={<Navigate to={'/'} replace />} />
          <Route path={'people'}>
            <Route index element={<PeoplePage />} />
            <Route path={':personSlug'} element={<PeoplePage />} />
          </Route>
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

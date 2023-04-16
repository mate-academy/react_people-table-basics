import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { MainNav } from './components/MainNav';

export const App = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Routes>
    </main>
  </div>
);

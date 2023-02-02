import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { PeoplePage } from './pages/people/PeoplePage';
import { NotFoundPage } from './pages/notFound/NotFoundPage';

import './App.scss';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  </div>
);

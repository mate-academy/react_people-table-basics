import { FC } from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';

export const App: FC = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

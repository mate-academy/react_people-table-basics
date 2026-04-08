import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

export const App = () => (
  <>
    <Navbar />

    <div data-cy="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people/:personSlug?" element={<PeoplePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <div className="container">-</div>
    </div>
  </>
);

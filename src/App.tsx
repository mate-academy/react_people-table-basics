import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">

    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:selectedSlug" element={<PeoplePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);

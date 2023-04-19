import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { ErrorPage } from './components/ErrorPage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  </div>
);

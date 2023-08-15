import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => (
  <div data-cy="app">
    <Navigation />
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="/people/" element={<PeoplePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

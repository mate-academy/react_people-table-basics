import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Loader/Navigation/Navigation';
import { HomePage } from './components/Loader/HomePage/HomePage';
import { NotFountPage } from './components/Loader/NotFounPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<Navigate to={'/'} replace />}></Route>
        <Route path="/people" element={<PeoplePage />}></Route>
        <Route path="/people/:slug" element={<PeoplePage />}></Route>
        <Route path="*" element={<NotFountPage />}></Route>
      </Routes>
    </div>
  );
};

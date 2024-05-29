import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import PeoplePage from './components/PeoplePage';
import HomePage from './components/HomePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </div>
);

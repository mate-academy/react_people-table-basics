import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { Home } from './components/HomePage/Home';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
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

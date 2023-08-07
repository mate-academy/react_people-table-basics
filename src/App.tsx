import React from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';


export const App: React.FC = () => (
  <div data-cy="app">
    <Routes>
      <Route
        path="/"
        element={<Layout><HomePage /></Layout>}
      />
      <Route
        path="home"
        element={<Navigate replace to="/" />}
      />
      <Route path="people" element={<Layout><Outlet /></Layout>}>
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route
        path="*"
        element={<Layout><NotFoundPage /></Layout>}
      />
    </Routes>
  </div>
);

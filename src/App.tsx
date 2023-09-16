import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Layout } from './components/Layout/Layout';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<PageNotFound />} />

      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
    </Route>
  </Routes>
);

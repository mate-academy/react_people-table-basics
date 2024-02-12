import React from 'react';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../Pages/HomePage/HomePage';
import { NotFoundPage } from '../Pages/NotFoundPage/NotFoundPage';
import { PeoplePage } from '../Pages/PeoplePage/PeoplePage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);

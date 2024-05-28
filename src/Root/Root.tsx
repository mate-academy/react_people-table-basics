import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { App } from '../App';
import { HomePage } from '../pages/HomePage';
import { PeoplePage } from '../pages/PeoplePage';
import { ErrorPage } from '../pages/ErrorPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </HashRouter>
);

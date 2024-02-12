/* eslint-disable object-curly-newline */
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="title" data-cy="app">Page not found</h1>}
        />
      </Route>
    </Routes>
  </HashRouter>
);

import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Outlet from './pages/Outlet';
import PeoplePage from './pages/PeoplePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Outlet />}>
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

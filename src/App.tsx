import { Navigate, Route, Routes } from 'react-router-dom';

import { PeoplePage } from './PeoplePage';
import { Home } from './Home';
import { NavPage } from './NavList';
import { NotFound } from './NotFound';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <NavPage />

    <main>
      <div className="constainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":personLink" element={<PeoplePage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);

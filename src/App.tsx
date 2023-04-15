import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { Navigation } from './components/Navigation/Navigation';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/Errors/NotFoundPage';
import { LinkType } from './types/Links';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path={LinkType.HomePage} element={<HomePage />} />

            <Route
              path="home"
              element={
                <Navigate to={LinkType.HomePage} replace />
              }
            />

            <Route path={LinkType.PeoplePage}>
              <Route index element={<PeoplePage />} />

              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path={LinkType.ErrorPage} element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

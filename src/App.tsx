import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { Navigation } from './components/Navigation/Navigation';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/Errors/NotFoundPage';
import { PageRoutes } from './types/PageRoutes';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path={PageRoutes.HomePage} element={<HomePage />} />

            <Route
              path="home"
              element={
                <Navigate to={PageRoutes.HomePage} replace />
              }
            />

            <Route path={PageRoutes.PeoplePage}>
              <Route index element={<PeoplePage />} />

              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path={PageRoutes.ErrorPage} element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

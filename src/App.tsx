import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import './App.scss';

import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PeopleNav } from './components/PeopleNav';

export const App = () => {
  return (
    <div data-cy="app">
      <PeopleNav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="people"
              element={
                (
                  <PeoplePage />
                )
              }
            >
              <Route
                path=":slug"
                element={
                  (
                    <PeoplePage />
                  )
                }
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

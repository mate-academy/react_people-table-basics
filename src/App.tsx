import React from 'react';

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './App.scss';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route path="/people">
              <Route
                // ставим индекс и он значит адрес что в обертке то есть /people
                index
                element={(
                  <>
                    {/* <h1 className="title">People Page</h1> */}
                    <PeoplePage />
                  </>
                )}
              />
              <Route
                // то что после : оно должно бть в юз парамс хуке
                // этот адрес нужен чтобы вместе со слагом тоже генреилась таблица но
                // урл был изменен и в таблице сработает функция сравнения и класс активный поменяется
                // оставляем просто :selectedPersonSlug так как /people подставится из верхнего роута
                path=":selectedPersonSlug"
                element={(
                  <PeoplePage />
                )}
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

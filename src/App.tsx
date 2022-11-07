import { useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { MainNav } from './components/MainNav';
import { PeoplePage } from './components/PeoplePage';
import { Person } from './types';

export const App = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);

  return (
    <div data-cy="app">
      <MainNav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage
                    peoples={peoples}
                    setPeoples={setPeoples}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    peoples={peoples}
                    setPeoples={setPeoples}
                  />
                )}
              />
            </Route>

            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
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

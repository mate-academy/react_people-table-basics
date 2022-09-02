import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';
import { Nagation } from './components/Navigate';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Nagation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="people"
            element={(
              <>
                <h1 className="title">People Page</h1>
                <PeoplePage />
              </>
            )}
          >
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </div>
    </main>
  </div>
);

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { PeopleList } from './components/PeopleList/PeopleList';
import { Nav } from './components/NavList/Nav';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFoundPage/PageNotFound';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Nav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="people"
              element={<PeoplePage />}
            >
              <Route path=":personSlug" element={<PeopleList />} />
            </Route>
            <Route
              path="*"
              element={<PageNotFound />}
            />
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

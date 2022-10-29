import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { PeopleTable } from './components/PeopleTable';
import { MainNav } from './components/MainNav';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <MainNav />

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
            <Route path="people">
              <Route
                index
                element={<PeopleTable />}
              />
              <Route
                path=":personId"
                element={<PeopleTable />}
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

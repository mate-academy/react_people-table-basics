import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { PeopleTable } from './components/PeopleTable';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="title">Home Page</h1>
            }
          />

          <Route
            path="/people"
            element={<PeopleTable />}
          />

          <Route
            path="/people/:slug"
            element={<PeopleTable />}
          />

          <Route
            path="/home"
            element={
              <Navigate to="/" />
            }
          />

          <Route
            path="*"
            element={
              <h1 className="title">Page not found</h1>
            }
          />
        </Routes>

      </div>
    </main>
  </div>
);

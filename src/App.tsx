import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';

import './App.scss';
import { Table } from './components/Table';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <Table />
                </>
              )}
            >
              <Route
                path="/people/:personSlug"
                element={<Table />}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

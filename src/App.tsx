import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { TableOfPeople } from './pages/TableOfPeople';
import { Navigation } from './pages/Navigation';

export const App = () => {
  return (
    <>
      <Navigation />
      <div data-cy="app">
        <main className="section">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<h1 className="title">Home Page</h1>}
              />

              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="people">
                <Route
                  index
                  element={<TableOfPeople />}
                />

                <Route
                  path=":slug"
                  element={<TableOfPeople />}
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
    </>
  );
};

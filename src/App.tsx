import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { Nav } from './Nav';
import { People } from './People';

export const App = () => (
  <div data-cy="app">
    <Nav />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />
          <Route path="people" element={<People />}>
            <Route path=":slug" element={<People />} />
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

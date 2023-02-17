import { Navigate, Route, Routes } from 'react-router-dom';
import { PeopleTable } from './components/People/PeopleTable';

import './App.scss';

import { NavBar } from './components/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/home"
            element={
              <Navigate to="/" replace />
            }
          />
          <Route
            path="/"
            element={
              <h1 className="title">Home Page</h1>
            }
          />
          <Route path="/people">
            <Route
              index
              element={
                <PeopleTable />
              }
            />
            <Route
              path=":personSlug"
              element={
                <PeopleTable />
              }
            />
          </Route>
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

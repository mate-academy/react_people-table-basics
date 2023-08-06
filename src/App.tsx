import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout';
import { PeoplePage } from './pages/PeoplePage';

export const App: React.FC = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<h1 className="title">Home Page</h1>}
        />
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Route>

      <Route
        path="home"
        element={<Navigate replace to="/" />}
      >
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Route>

      <Route path="people" element={<Layout />}>
        <Route path=":slug?" element={<PeoplePage />} />
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Route>

      <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
    </Routes>
  </div>
);

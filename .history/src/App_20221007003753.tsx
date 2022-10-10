import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useState } from 'react';

import { Loader } from './components/Loader';
import PeopleList from './components/PeopleList';
import Navigation from './components/Navigation';

import './App.scss';
import { Home } from './pages/Home/Home';
import { PeoplPage } from './pages/People/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="people"
              element={<PeoplPage />}
            />

            <Route
              path="people/:personSlug"
              element={<PeoplPage />}
            />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

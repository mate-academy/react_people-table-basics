import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { NavBar } from './components/NavBar';
import { PeopleTable } from './components/PeopleTable';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="people">
              <Route index element={<PeopleTable />} />
              <Route path=":slug" element={<PeopleTable />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

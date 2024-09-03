import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PeopleTable } from './components/Loader/PeopleTable/PeopleTable';
import { Navigation } from './components/Navigation/Navigation';

export const Root: React.FC = () => (
  <div data-cy="app">
    <Navigation />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="/home" element={<Navigate to={'/'} />} />
          <Route path="/people" element={<PeopleTable />}>
            <Route path="/people/:slug" element={<PeopleTable />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);

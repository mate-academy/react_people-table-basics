import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Navigation } from './components/Navigation/Nav';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeopleList } from './components/PeopleList/PeopleList';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />

            <Route path="people">
              <Route index element={<PeopleList />} />
              <Route path=":slug" element={<PeopleList />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { Loader } from './components/Loader';

import './App.scss';
// import { People } from './page/People';
import { MainNav } from './components/MainNav';
import { Home } from './page/Home';
import { PeoplePage } from './page/PeoplePage';

export const App: React.FC = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>

      </div>
    </main>
  </div>
);

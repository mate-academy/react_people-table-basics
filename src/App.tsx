import './App.scss';
import React from 'react';
import { NavBar } from './components/Loader/NavBar';
import { Navigate, HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Loader/HomePage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { PageNotFound } from './components/Loader/PageNotFound';

export const App = () => (
  <HashRouter>
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  </HashRouter>
);

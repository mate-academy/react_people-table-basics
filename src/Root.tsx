import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { Error } from './pages/Error';
import { People } from './pages/People';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="People">
          <Route index element={<People />} />
          <Route path=":slug" element={<People />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </Router>
);

import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';
import React from 'react';

function RedirectToRoot() {
  return <Navigate to="/" replace />;
}

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<RedirectToRoot />} />
          <Route path="/people/:personId?" element={<PeoplePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import App from './App';
import PeoplePage from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);

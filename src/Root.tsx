// import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';

import React from 'react';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  //<HashRouter>
  <Routes>
    {/*<Route path="/home" element={<App />}>
      <Route index element={<HomePage />} />
    </Route>*/}
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
  //</HashRouter>
);

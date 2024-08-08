import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { PeoplesProvider } from './store/PeopleProvides';
import { NotFoundPage } from './NotFoundPage';
import React from 'react';
export const Root = () => (
  <HashRouter>
    <PeoplesProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </PeoplesProvider>
  </HashRouter>
);

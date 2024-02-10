import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => (
  <div data-cy="app">

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people/:slug?" element={<PeoplePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>

  </div>
);

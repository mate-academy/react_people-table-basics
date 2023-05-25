import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Homepage } from './components/page/Homepage';
import { PageNotF } from './components/page/PageNotF';
import { PeopP } from './components/page/PeopP';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <Routes>
      <Route
        path="/"
        element={<Homepage />}
      />

      <Route path="people">
        <Route index element={<PeopP />} />
        <Route path=":slug" element={<PeopP />} />
      </Route>

      <Route
        path="*"
        element={<PageNotF />}
      />

      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  </div>
);

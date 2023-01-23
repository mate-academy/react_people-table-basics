import {
  Routes, Route, Navigate,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">

    <Navbar />

    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  </div>
);

import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { Wrapper } from './components/Wrapper';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <Routes>
      <Route element={<Wrapper />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavBar } from './page/NavBar';
import { HomePage } from './page/HomePage';
import { PeoplePage } from './page/PeoplePage';
import { NotFoundPage } from './page/NotFound';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="people">
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

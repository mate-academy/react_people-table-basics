import { Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar/NavBar';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/people" element={<PeoplePage />}>
        <Route index element={<PeoplePage />} />
        <Route path=":personId" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

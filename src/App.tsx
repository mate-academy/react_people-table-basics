import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/Navbar/NavBar';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":userSlug" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

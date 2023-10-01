import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// import { Loader } from './components/Loader';
import { HomePage } from './components/pages/HomePage/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage/NotFoundPage';

import './App.scss';
import { PeoplePage } from './components/pages/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personId" />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

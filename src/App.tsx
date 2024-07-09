import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import {
  alternateHomePath,
  homePath,
  peoplePath,
  peopleWithSlugPath,
} from './consts/paths';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path={homePath} element={<HomePage />} />

          <Route
            path={alternateHomePath}
            element={<Navigate to={homePath} replace />}
          />

          <Route path={peoplePath}>
            <Route index element={<PeoplePage />} />
            <Route path={peopleWithSlugPath} element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

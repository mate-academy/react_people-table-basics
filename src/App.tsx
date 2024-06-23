import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Nav } from './components/Nav/Nav';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace={true} />} />
          <Route path="people">
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

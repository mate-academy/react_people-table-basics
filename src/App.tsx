import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NavBar } from './components/NavBar';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />

          <Route path="home" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  </div>
);

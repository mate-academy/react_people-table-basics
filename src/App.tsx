import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="people" element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="home" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Loader/pages/HomePage';
import { NotFoundPage } from './components/Loader/pages/NotFoundPage';
import { PeoplePage } from './components/Loader/pages/PeoplePage';
import { NavBar } from './components/Loader/pages/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </main>
  </div>
);

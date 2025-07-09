import './App.scss';
import { NavBar } from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people/:slug?" element={<PeoplePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};
